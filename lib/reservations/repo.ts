import type { Reservation } from "./types";

/**
 * Rozhraní pro ukládání rezervací.
 *
 * Default implementace: in-memory (demo).
 * UNSPECIFIED upgrade path:
 * - Redis (Upstash) – serverless-friendly, persistence across deploys
 * - PostgreSQL (Vercel Postgres / Neon) – plnohodnotná databáze
 * - Supabase – PostgreSQL + realtime + auth
 *
 * Pro přepnutí implementujte toto rozhraní a změňte export v tomto souboru.
 */
export interface ReservationRepo {
  create(reservation: Reservation): Promise<Reservation>;
  getAll(): Promise<Reservation[]>;
}
