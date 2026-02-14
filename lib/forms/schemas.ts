import { z } from "zod";

/**
 * Validační schémata pro formuláře (sdílená mezi klientem a serverem).
 */

/* ===== Kontaktní formulář ===== */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Prosím vyplň jméno (minimálně 2 znaky)."),
  email: z
    .string()
    .email("Zadej platný e‑mail."),
  topic: z
    .string()
    .optional(),
  message: z
    .string()
    .min(10, "Zpráva je moc krátká (min. 10 znaků)."),
  // Honeypot – musí být prázdný
  website: z
    .string()
    .max(0, "Spam detekován.")
    .optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/* ===== Rezervace ===== */

/**
 * UNSPECIFIED default – otevírací sloty (lze změnit v konstantách).
 * Generuje se na základě otevírací doby.
 */
export const RESERVATION_TIME_SLOTS = [
  "8:00", "8:30", "9:00", "9:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
] as const;

/** UNSPECIFIED – max osob pro online rezervaci */
export const MAX_GUESTS_ONLINE = 8;

export const reservationStep1Schema = z.object({
  date: z
    .string()
    .min(1, "Vyber datum.")
    .refine(
      (val) => {
        const d = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return d >= today;
      },
      { message: "Vyber datum v budoucnu." }
    ),
  time: z
    .string()
    .min(1, "Zvol čas.")
    .refine(
      (val) => (RESERVATION_TIME_SLOTS as readonly string[]).includes(val),
      { message: "Zvol čas v otevírací době." }
    ),
  guests: z
    .number({ coerce: true })
    .int()
    .min(1, "Alespoň 1 osoba.")
    .max(MAX_GUESTS_ONLINE, `Online rezervace je pro 1–${MAX_GUESTS_ONLINE} osob. Větší skupiny prosím zavolej.`),
});

export const reservationStep2Schema = z.object({
  name: z
    .string()
    .min(2, "Prosím vyplň jméno (minimálně 2 znaky)."),
  email: z
    .string()
    .email("Zadej platný e‑mail."),
  phone: z
    .string()
    .optional(),
  note: z
    .string()
    .optional(),
});

/** Kompletní schéma pro server-side validaci */
export const reservationSchema = reservationStep1Schema.merge(reservationStep2Schema).extend({
  // Honeypot
  website: z.string().max(0, "Spam detekován.").optional(),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;
export type ReservationStep1 = z.infer<typeof reservationStep1Schema>;
export type ReservationStep2 = z.infer<typeof reservationStep2Schema>;

/* ===== Newsletter ===== */
export const newsletterSchema = z.object({
  email: z.string().email("Zadej platný e‑mail."),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
