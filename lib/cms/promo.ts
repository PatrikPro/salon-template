import type { PromoData } from "./types";

/**
 * Určí, zda je promo aktivní včetně volitelného časového okna.
 */
export function isPromoActive(promo: PromoData, now = Date.now()): boolean {
  if (!promo.isActive) return false;
  if (promo.validFrom) {
    const t = Date.parse(promo.validFrom);
    if (!Number.isNaN(t) && t > now) return false;
  }
  if (promo.validTo) {
    const t = Date.parse(promo.validTo);
    if (!Number.isNaN(t) && t < now) return false;
  }
  return true;
}
