import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente com service_role: ignora RLS. Uso restrito a rotas de servidor
 * que já validaram a role do usuário (ex: gestão de usuários, cron de agendamento).
 * Nunca importar em código que roda no navegador.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
