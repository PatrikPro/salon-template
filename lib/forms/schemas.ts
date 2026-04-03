import { z } from "zod";

/**
 * Validační schémata pro formuláře (sdílená mezi klientem a serverem).
 */

export const contactSchema = z.object({
  name: z.string().min(2, "Prosím vyplň jméno (minimálně 2 znaky)."),
  email: z.string().email("Zadej platný e‑mail."),
  topic: z.string().optional(),
  message: z.string().min(10, "Zpráva je moc krátká (min. 10 znaků)."),
  website: z.string().max(0, "Spam detekován.").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Zadej platný e‑mail."),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
