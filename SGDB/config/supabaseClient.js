const { createClient } = require('@supabase/supabase-js');

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `[Supabase] Environment variable missing: ${name}. Set it in .env (SUPABASE_URL, SUPABASE_ANON_KEY).`
    );
  }
  return value;
}

/**
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
function createSupabaseClient() {
  const url = process.env.SUPABASE_URL || '';
  const anonKey = process.env.SUPABASE_ANON_KEY || '';

  if (!url || !anonKey) {
    throw new Error(
      '[Supabase] Missing configuration. Define SUPABASE_URL and SUPABASE_ANON_KEY in environment variables.'
    );
  }

  return createClient(url, anonKey);
}

module.exports = {
  createSupabaseClient,
};

