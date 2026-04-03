/**
 * Abstrakce rezervačního providera (Reservio, Bookio, …).
 * Konfigurace v content/reservationSettings.json.
 */
export type { BookingMode, ReservationSettings } from "@/lib/cms/types";
export { loadReservationSettings as loadBookingConfig } from "@/lib/cms/loadContent";
