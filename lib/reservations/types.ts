/**
 * Typy pro rezervační systém.
 */

export interface Reservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone?: string;
  note?: string;
  createdAt: string;
}
