/**
 * Volitelná reCAPTCHA integrace (feature-flag přes env).
 *
 * UNSPECIFIED – reCAPTCHA není aktivní v defaultní konfiguraci.
 * Pro aktivaci:
 * 1. Nastavte NEXT_PUBLIC_RECAPTCHA_SITE_KEY a RECAPTCHA_SECRET_KEY v .env.local
 * 2. Na klientu přidejte reCAPTCHA widget a pošlete token v body
 * 3. Na serveru zavolejte verifyRecaptcha(token)
 */

/** Zda je reCAPTCHA aktivní */
export function isRecaptchaEnabled(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY &&
    process.env.RECAPTCHA_SECRET_KEY
  );
}

/**
 * Server-side ověření reCAPTCHA tokenu.
 * Volat pouze pokud isRecaptchaEnabled() === true.
 */
export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return false;

  try {
    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
      { method: "POST" }
    );
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}
