"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";
import { InputField, SelectField, TextareaField } from "@/components/ui/FormField";
import { Toast } from "@/components/ui/Toast";
import {
  reservationStep1Schema,
  reservationStep2Schema,
  RESERVATION_TIME_SLOTS,
  MAX_GUESTS_ONLINE,
  type ReservationStep1,
  type ReservationStep2,
} from "@/lib/forms/schemas";

const STEPS = ["Datum & čas", "Kontaktní údaje", "Rekapitulace"];

/**
 * Krokový rezervační formulář s 3 kroky:
 * 1. Datum, čas, počet osob
 * 2. Jméno, e-mail, telefon, poznámka
 * 3. Rekapitulace + submit
 */
export function ReservationForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Formuláře pro jednotlivé kroky
  const step1Form = useForm<ReservationStep1>({
    resolver: zodResolver(reservationStep1Schema),
    defaultValues: { date: "", time: "", guests: 2 },
  });

  const step2Form = useForm<ReservationStep2>({
    resolver: zodResolver(reservationStep2Schema),
    defaultValues: { name: "", email: "", phone: "", note: "" },
  });

  // Navigace kroků
  const goToStep2 = step1Form.handleSubmit(() => setStep(1));
  const goToStep3 = step2Form.handleSubmit(() => setStep(2));

  // Submit na API
  const handleSubmit = async () => {
    setStatus("loading");
    setErrorMsg("");

    const data = {
      ...step1Form.getValues(),
      ...step2Form.getValues(),
      website: "", // honeypot
    };

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const body = await res.json().catch(() => null);
        setErrorMsg(body?.error ?? "Něco se pokazilo. Zkuste to znovu.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Chyba připojení. Zkuste to znovu.");
      setStatus("error");
    }
  };

  // Čas selecty
  const timeOptions = RESERVATION_TIME_SLOTS.map((t) => ({
    value: t,
    label: t,
  }));

  // Počet osob selecty
  const guestOptions = Array.from({ length: MAX_GUESTS_ONLINE }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1} ${i + 1 === 1 ? "osoba" : i + 1 < 5 ? "osoby" : "osob"}`,
  }));

  if (status === "success") {
    return (
      <div className="text-center space-y-4 py-10">
        <Toast
          variant="success"
          message="Rezervace přijata. Těšíme se na tebe ☕"
        />
        <p className="text-coffee-600 font-serif">
          Na e-mail <strong>{step2Form.getValues("email")}</strong> jsme odeslali
          potvrzení (mock).
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            setStatus("idle");
            setStep(0);
            step1Form.reset();
            step2Form.reset();
          }}
        >
          Nová rezervace
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Stepper steps={STEPS} currentStep={step} />

      {/* Krok 1: Datum & čas */}
      {step === 0 && (
        <form onSubmit={goToStep2} className="space-y-5" noValidate>
          <InputField
            label="Datum"
            type="date"
            {...step1Form.register("date")}
            error={step1Form.formState.errors.date?.message}
            min={new Date().toISOString().split("T")[0]}
          />

          <SelectField
            label="Čas"
            options={[{ value: "", label: "Vyber čas…" }, ...timeOptions]}
            {...step1Form.register("time")}
            error={step1Form.formState.errors.time?.message}
          />

          <SelectField
            label="Počet osob"
            options={guestOptions}
            {...step1Form.register("guests")}
            error={step1Form.formState.errors.guests?.message}
          />

          <Button type="submit" fullWidth size="lg">
            Pokračovat
          </Button>
        </form>
      )}

      {/* Krok 2: Kontaktní údaje */}
      {step === 1 && (
        <form onSubmit={goToStep3} className="space-y-5" noValidate>
          <InputField
            label="Jméno"
            placeholder="Jan Novák"
            {...step2Form.register("name")}
            error={step2Form.formState.errors.name?.message}
          />

          <InputField
            label="E-mail"
            type="email"
            placeholder="jan@domena.cz"
            {...step2Form.register("email")}
            error={step2Form.formState.errors.email?.message}
          />

          <InputField
            label="Telefon (nepovinné)"
            type="tel"
            placeholder="+420 …"
            {...step2Form.register("phone")}
          />

          <TextareaField
            label="Poznámka (nepovinné)"
            placeholder="Např. dětská židlička, alergie…"
            {...step2Form.register("note")}
          />

          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep(0)}
              className="flex-1"
            >
              ← Zpět
            </Button>
            <Button type="submit" className="flex-1" size="lg">
              Pokračovat
            </Button>
          </div>
        </form>
      )}

      {/* Krok 3: Rekapitulace */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-cream-300 p-6 space-y-3">
            <h3 className="font-sans font-bold text-coffee text-lg mb-2">
              Shrnutí rezervace
            </h3>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="font-sans font-medium text-coffee-500">Datum</dt>
              <dd className="font-serif text-coffee-800">
                {step1Form.getValues("date")}
              </dd>
              <dt className="font-sans font-medium text-coffee-500">Čas</dt>
              <dd className="font-serif text-coffee-800">
                {step1Form.getValues("time")}
              </dd>
              <dt className="font-sans font-medium text-coffee-500">Osoby</dt>
              <dd className="font-serif text-coffee-800">
                {step1Form.getValues("guests")}
              </dd>
              <dt className="font-sans font-medium text-coffee-500">Jméno</dt>
              <dd className="font-serif text-coffee-800">
                {step2Form.getValues("name")}
              </dd>
              <dt className="font-sans font-medium text-coffee-500">E-mail</dt>
              <dd className="font-serif text-coffee-800">
                {step2Form.getValues("email")}
              </dd>
              {step2Form.getValues("phone") && (
                <>
                  <dt className="font-sans font-medium text-coffee-500">Telefon</dt>
                  <dd className="font-serif text-coffee-800">
                    {step2Form.getValues("phone")}
                  </dd>
                </>
              )}
              {step2Form.getValues("note") && (
                <>
                  <dt className="font-sans font-medium text-coffee-500">Poznámka</dt>
                  <dd className="font-serif text-coffee-800">
                    {step2Form.getValues("note")}
                  </dd>
                </>
              )}
            </dl>
          </div>

          {status === "error" && (
            <Toast
              variant="error"
              message={errorMsg}
              onClose={() => setStatus("idle")}
            />
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep(1)}
              className="flex-1"
              disabled={status === "loading"}
            >
              ← Zpět
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1"
              size="lg"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Odesílám…" : "Potvrdit rezervaci"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
