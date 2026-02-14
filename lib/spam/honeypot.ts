/**
 * Honeypot anti-spam ochrana.
 *
 * Funguje tak, že formulář obsahuje skryté pole "website".
 * Boti ho vyplní, legitimní uživatelé ne.
 * Na serveru kontrolujeme, zda je pole prázdné.
 */

/**
 * Ověří, že honeypot pole je prázdné (= není to spam bot).
 * @returns true pokud je request čistý, false pokud jde o spam
 */
export function checkHoneypot(websiteField?: string): boolean {
  return !websiteField || websiteField.trim() === "";
}
