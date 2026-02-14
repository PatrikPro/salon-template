import type { Reservation } from "./types";

/**
 * Konverze pole rezervací do CSV formátu.
 */
export function reservationsToCSV(reservations: Reservation[]): string {
  const headers = [
    "ID",
    "Datum",
    "Čas",
    "Počet osob",
    "Jméno",
    "E-mail",
    "Telefon",
    "Poznámka",
    "Vytvořeno",
  ];

  const rows = reservations.map((r) =>
    [
      r.id,
      r.date,
      r.time,
      String(r.guests),
      escapeCsvField(r.name),
      r.email,
      r.phone ?? "",
      escapeCsvField(r.note ?? ""),
      r.createdAt,
    ].join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}

/** Escapuje pole pro CSV (dvojité uvozovky pro pole s čárkami/uvozovkami) */
function escapeCsvField(field: string): string {
  if (field.includes(",") || field.includes('"') || field.includes("\n")) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}
