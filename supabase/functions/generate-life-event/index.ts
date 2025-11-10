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

    const systemPrompt = `You are a life simulation AI that creates easy-to-understand, career-focused life events.

Generate a CLEAR and SIMPLE life event for ${username}, age ${age}, who works as a ${career} in ${country}.

Current Situation:
- Education: ${education}
- Personality: ${personality}
- Risk Style: ${riskTolerance}
- Happiness: ${currentStats?.happiness}/100 | Wealth: ${currentStats?.wealth} | Health: ${currentStats?.health}/100 | Legacy: ${currentStats?.legacy}/100

HOW TO CREATE EVENTS:
1. Write in SIMPLE, EVERYDAY language - avoid complex words
2. Make it about their ${career} career - this is their main story
3. Create events that match their age ${age}:
   - Age 0-5: Birth and baby years
   - Age 13-18: School, discovering ${career} interest
   - Age 18-25: Learning ${career} skills, first job
   - Age 25-40: Growing in ${career}, getting promoted, balancing work and life
   - Age 40-60: Becoming a leader, teaching others, reaching career peak
   - Age 60-90: Retiring, leaving a legacy, mentoring young people
4. Add family and relationship moments that connect to their ${career}
5. Give 2-3 CLEAR choices most of the time (60% of events)
6. Make each choice show what will happen to their happiness, money, health, and reputation

KEEP IT SIMPLE:
- Use short sentences
- Explain things clearly
- Make choices obvious
- Show what each choice will do

Return ONLY this JSON format:
{
  "title": "Simple, clear event title",
  "description": "2-3 easy-to-read sentences explaining what's happening",
  "type": "career|health|social|financial|education|family|achievement",
  "hasChoice": true/false,
  "choices": [
    {
      "text": "Simple choice with clear outcome",
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
