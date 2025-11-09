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
    const { age, country, education, personality, career, riskTolerance, previousEvents } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const systemPrompt = `You are a life simulation engine. Generate realistic life events for a person based on their profile and current age. Events should be age-appropriate and reflect realistic life progressions.

Consider:
- Educational milestones (school, college, graduation)
- Career progression (entry level, promotions, challenges)
- Relationships (friendships, romance, marriage, family)
- Health events (minor illnesses, fitness achievements, serious conditions)
- Financial changes (savings, investments, losses, windfalls)
- Personal growth (hobbies, achievements, failures)
- Social connections (community involvement, networking)

Generate a single life event as a JSON object with this structure:
{
  "title": "Brief event title",
  "description": "Detailed description of what happened",
  "type": "career|education|relationship|health|financial|personal",
  "impact": {
    "happiness": number between -20 and 20,
    "wealth": number between -20 and 20,
    "health": number between -20 and 20,
    "legacy": number between -10 and 10
  },
  "hasChoice": boolean,
  "choices": [
    {
      "text": "Choice text",
      "impact": { same structure as above }
    }
  ] (only if hasChoice is true)
}

Make the event realistic and appropriate for age ${age}. Consider their background: ${country}, ${education}, ${personality}, ${career}, risk tolerance: ${riskTolerance}.`;

    const userPrompt = previousEvents && previousEvents.length > 0 
      ? `Previous events in this person's life: ${JSON.stringify(previousEvents.slice(-5))}. Generate the next life event at age ${age}.`
      : `Generate the first life event for a person who is ${age} years old.`;

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
