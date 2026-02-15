import type { Metadata } from "next";
import { ReservationForm } from "./ReservationForm";

export const metadata: Metadata = {
  title: "Rezervace",
  description:
    "Zarezervuj si stůl v Zuzu Café online. Rychle a jednoduše.",
};

export default function ReservationPage() {
  return (
    <main id="main-content" className="py-12 md:py-20">
      <div className="container-main max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-sans font-bold text-coffee mb-3">
            Rezervace
          </h1>
          <p className="text-coffee-600 font-serif text-lg">
            Vyber si datum, čas a počet osob. Online rezervace pro 1–8 osob.
            <br />
            <span className="text-sm text-coffee-400">
              Větší skupiny prosím{" "}
              <a href="tel:+420777123456" className="underline hover:text-coffee">
                zavolej
              </a>
              .
            </span>
          </p>
        </div>

        <ReservationForm />
      </div>
    </main>
  );
}
