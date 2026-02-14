import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/forms/schemas";
import { checkHoneypot } from "@/lib/spam/honeypot";
import { isRecaptchaEnabled, verifyRecaptcha } from "@/lib/spam/recaptcha";

/**
 * POST /api/contact – zpracování kontaktního formuláře.
 * - Validace přes zod
 * - Honeypot kontrola
 * - Volitelná reCAPTCHA verifikace
 * - Mock: loguje do konzole (v produkci by se posílal e-mail)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot check
    if (!checkHoneypot(body.website)) {
      // Tichý reject – nechceme spammerům dávat info
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validace
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Neplatná data.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    // Volitelná reCAPTCHA
    if (isRecaptchaEnabled()) {
      const token = body.recaptchaToken;
      if (!token || !(await verifyRecaptcha(token))) {
        return NextResponse.json(
          { error: "reCAPTCHA ověření selhalo." },
          { status: 400 }
        );
      }
    }

    // Mock: logování (v produkci by se odeslal e-mail / uložil do DB)
    console.log("[CONTACT]", {
      name: parsed.data.name,
      email: parsed.data.email,
      topic: parsed.data.topic,
      message: parsed.data.message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Zpráva přijata. Ozveme se co nejdřív.",
    });
  } catch {
    return NextResponse.json(
      { error: "Neplatný požadavek." },
      { status: 400 }
    );
  }
}
