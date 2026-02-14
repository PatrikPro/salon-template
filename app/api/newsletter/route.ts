import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/forms/schemas";

/**
 * POST /api/newsletter – přihlášení k newsletteru.
 * Mock implementace – loguje do konzole.
 * V produkci by se napojil na Mailchimp / Brevo / ConvertKit.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Neplatná data.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    // Mock: logování
    console.log("[NEWSLETTER]", {
      email: parsed.data.email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Díky za přihlášení k newsletteru!",
    });
  } catch {
    return NextResponse.json(
      { error: "Neplatný požadavek." },
      { status: 400 }
    );
  }
}
