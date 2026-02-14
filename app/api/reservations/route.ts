import { NextResponse } from "next/server";
import { reservationSchema } from "@/lib/forms/schemas";
import { checkHoneypot } from "@/lib/spam/honeypot";
import { reservationRepo } from "@/lib/reservations/repoMemory";
import type { Reservation } from "@/lib/reservations/types";

/**
 * POST /api/reservations – vytvoření nové rezervace.
 * - Validace přes zod (datum, čas, osoby, kontakt)
 * - Honeypot kontrola
 * - Uložení do repo (default: in-memory)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot
    if (!checkHoneypot(body.website)) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validace
    const parsed = reservationSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Neplatná data.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = parsed.data;

    // Vytvoření rezervace
    const reservation: Reservation = {
      id: `res_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      date: data.date,
      time: data.time,
      guests: data.guests,
      name: data.name,
      email: data.email,
      phone: data.phone,
      note: data.note,
      createdAt: new Date().toISOString(),
    };

    await reservationRepo.create(reservation);

    console.log("[RESERVATION]", reservation);

    return NextResponse.json({
      success: true,
      message: "Rezervace přijata. Těšíme se na tebe.",
      reservationId: reservation.id,
    });
  } catch {
    return NextResponse.json(
      { error: "Neplatný požadavek." },
      { status: 400 }
    );
  }
}
