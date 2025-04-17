import { createClient } from 'npm:@supabase/supabase-js@2.39.0';
import { Configuration, OpenAIApi } from 'npm:openai@3.3.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-user-id',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const { content } = await req.json().catch(() => ({}));

    if (!content) {
      return new Response(
        JSON.stringify({ error: 'Email content is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key is not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const configuration = new Configuration({
      apiKey,
    });

    const openai = new OpenAIApi(configuration);

    const prompt = `
      Analyze the following email content for potential phishing attempts. Consider:
      1. Urgency or pressure tactics
      2. Grammar and spelling errors
      3. Suspicious links or requests
      4. Impersonation attempts
      5. Unusual sender addresses
      
      Provide a risk assessment (high/low) and detailed explanation.
      
      Email content:
      ${content}
    `;

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 500,
      temperature: 0.7,
    });

    const analysis = completion.data.choices[0].text?.trim() || '';
    const riskLevel = analysis.toLowerCase().includes('high risk') ? 'high' : 'low';
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: dbError } = await supabase
      .from('phishing_analyses')
      .insert({
        email_content: content,
        risk_level: riskLevel,
        analysis_result: analysis,
        user_id: userId,
      });

    if (dbError) {
      console.error('Error saving analysis:', dbError);
      // Continue with the response even if saving to DB fails
    }
    
    return new Response(
      JSON.stringify({
        risk: riskLevel,
        explanation: analysis,
      }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (error) {
    console.error('Analysis error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
});