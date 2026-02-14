import type { Reservation } from "./types";
import type { ReservationRepo } from "./repo";

/**
 * In-memory implementace ReservationRepo (demo).
 *
 * ⚠️ OMEZENÍ:
 * - Data se ztratí při restartu serveru / novém deployi (serverless = cold start).
 * - Vhodné pouze pro vývoj a demo účely.
 * - Pro produkci použijte persistentní storage (Redis, PostgreSQL).
 */
class MemoryReservationRepo implements ReservationRepo {
  private store: Reservation[] = [];

  async create(reservation: Reservation): Promise<Reservation> {
    this.store.push(reservation);
    return reservation;
  }

  async getAll(): Promise<Reservation[]> {
    return [...this.store];
  }
}

/** Singleton instance – sdílená v rámci jedné serverless instance */
export const reservationRepo: ReservationRepo = new MemoryReservationRepo();
