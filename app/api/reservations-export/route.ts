import { NextRequest, NextResponse } from "next/server";
import { reservationRepo } from "@/lib/reservations/repoMemory";
import { reservationsToCSV } from "@/lib/reservations/csv";

/**
 * GET /api/reservations-export – export rezervací do CSV.
 *
 * Chráněno tokenem (env RESERVATIONS_EXPORT_TOKEN).
 * Token se posílá jako:
 * - Header: X-Export-Token
 * - Query parametr: ?token=...
 *
 * UNSPECIFIED – default token je "change-me-before-deploy".
 */
export async function GET(request: NextRequest) {
  const expectedToken =
    process.env.RESERVATIONS_EXPORT_TOKEN ?? "change-me-before-deploy";

  // Získání tokenu z headeru nebo query
  const headerToken = request.headers.get("X-Export-Token");
  const queryToken = request.nextUrl.searchParams.get("token");
  const providedToken = headerToken || queryToken;

  if (!providedToken || providedToken !== expectedToken) {
    return NextResponse.json(
      { error: "Neautorizovaný přístup. Chybí nebo špatný token." },
      { status: 401 }
    );
  }

  const reservations = await reservationRepo.getAll();
  const csv = reservationsToCSV(reservations);

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="reservations-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
