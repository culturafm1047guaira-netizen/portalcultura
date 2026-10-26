import { Resend } from "resend";

/**
 * Remetente da newsletter. Precisa ser um e-mail em domínio verificado no
 * Resend (resend.com/domains) — "onboarding@resend.dev" só funciona em modo
 * de teste, enviando apenas para o próprio e-mail da conta Resend.
 */
export const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

let client: Resend | null = null;

/** `null` quando RESEND_API_KEY ainda não foi configurada (ver .env.example). */
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}
