import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    console.log('Received messages:', messages);

    // Ensure we have the API key
    if (!ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not set');
    }

    // Extract current level and hint from system message if present
    const systemMessage = messages.find(m => m.role === 'system')?.content || '';
    console.log('System context:', systemMessage);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'x-api-key': ANTHROPIC_API_KEY
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        messages: messages.map(msg => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content
        })),
        system: `You are a mystical guide helping users solve cipher puzzles in a Secret Santa game. Your role is to provide progressive hints that help users think through the puzzle without giving away the answer directly.

        For number-based ciphers (Level 1):
        - Guide users to look for patterns in the symbols
        - Hint at counting or sequence relationships
        - Suggest looking at how symbols might represent digits

        For word-based ciphers (Level 2):
        - Help users identify word patterns
        - Point out symbol groupings that might form words
        - Remind users about the riddle context

        For the final cipher (Level 3):
        - Connect hints to blockchain/crypto themes
        - Guide users to think about relevant blockchain terms
        - Help users see patterns in symbol groups

        Current puzzle context:
        ${systemMessage}

        Remember:
        - Stay in character as a mystical guide
        - Give hints that build on each other
        - If users are stuck, provide slightly more direct hints
        - Celebrate their progress when they're on the right track
        - Keep responses concise and focused on the puzzle at hand`
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API error:', errorText);
      throw new Error(`Claude API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Claude response:', data);

    if (!data.content || !data.content[0] || !data.content[0].text) {
      throw new Error('Invalid response format from Claude API');
    }

    return new Response(
      JSON.stringify({ response: data.content[0].text }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in claude-chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});