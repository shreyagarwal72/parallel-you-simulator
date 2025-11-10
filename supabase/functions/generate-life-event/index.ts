import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { age, country, education, personality, career, riskTolerance, username, currentStats, previousEvents } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const systemPrompt = `You are a life simulation AI that generates CAREER-FOCUSED, milestone-based life events.

Generate a SIGNIFICANT life event for ${username}, age ${age}, who is a ${career} in ${country}.

Profile:
- Education: ${education}
- Personality: ${personality}
- Risk Tolerance: ${riskTolerance}
- Current Stats: Happiness ${currentStats?.happiness}/100, Wealth ${currentStats?.wealth}, Health ${currentStats?.health}/100, Legacy ${currentStats?.legacy}/100

CRITICAL GUIDELINES:
1. Make the event DEEPLY CONNECTED to their ${career} career
2. This is a MILESTONE event at age ${age} - make it significant and memorable
3. Focus on these age-appropriate career milestones:
   - Age 0-5: Birth, early childhood development
   - Age 13-18: School years, discovering interest in ${career}
   - Age 18-25: University/training for ${career}, first internships, entry-level position
   - Age 25-40: Career advancement, major projects, promotions, work-life balance challenges
   - Age 40-60: Leadership roles, mentoring, industry recognition, career peak
   - Age 60-90: Legacy building, retirement, passing knowledge to next generation
4. Include relationships/family events that intersect with their ${career} career
5. 60% of events should offer 2-3 meaningful choices with clear consequences
6. Make events emotionally engaging and realistic

Return ONLY valid JSON:
{
  "title": "Career-focused event title",
  "description": "2-3 engaging sentences about this milestone",
  "type": "career|health|social|financial|education|family|achievement",
  "hasChoice": true/false,
  "choices": [
    {
      "text": "Choice description",
      "impact": {
        "happiness": -5 to +10,
        "wealth": "Starting Out|Comfortable|Well Off|Wealthy|Very Wealthy",
        "health": -5 to +10,
        "legacy": -5 to +10
      }
    }
  ],
  "impact": {
    "happiness": -5 to +10,
    "wealth": "Starting Out|Comfortable|Well Off|Wealthy|Very Wealthy",
    "health": -5 to +10,
    "legacy": -5 to +10
  }
}`;

    const userPrompt = previousEvents && previousEvents.length > 0 
      ? `Previous career milestones: ${JSON.stringify(previousEvents.slice(-3))}. Generate the next MAJOR career milestone for age ${age} as a ${career}.`
      : `Generate the first significant life event for ${username}, age ${age}, beginning their journey as a ${career}.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const eventText = data.choices[0].message.content;
    
    // Extract JSON from markdown code blocks if present
    let eventJson;
    const jsonMatch = eventText.match(/```json\n?([\s\S]*?)\n?```/) || eventText.match(/```\n?([\s\S]*?)\n?```/);
    if (jsonMatch) {
      eventJson = JSON.parse(jsonMatch[1]);
    } else {
      eventJson = JSON.parse(eventText);
    }

    return new Response(JSON.stringify(eventJson), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-life-event function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
