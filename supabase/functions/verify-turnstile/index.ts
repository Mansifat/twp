// Supabase Edge Function: verify-turnstile
// Runs server-side. Checks a Cloudflare Turnstile token against
// Cloudflare's siteverify API using the SECRET key — this must
// happen server-side since the secret key can never be exposed
// in the browser, and a client-reported "success" can't be trusted.
//
// Deploy with: supabase functions deploy verify-turnstile --no-verify-jwt
// (--no-verify-jwt because this runs BEFORE the user is logged in)
//
// Requires this secret to be set:
//   supabase secrets set TURNSTILE_SECRET_KEY=...

Deno.serve(async (req) => {
  // Allow the browser to call this function directly
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { token } = await req.json()

    if (!token) {
      return new Response(JSON.stringify({ success: false, error: 'Missing token' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const secretKey = Deno.env.get('TURNSTILE_SECRET_KEY')

    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: secretKey, response: token }),
    })

    const result = await verifyRes.json()

    return new Response(JSON.stringify({ success: result.success === true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ success: false, error: 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
