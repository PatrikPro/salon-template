"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField, TextareaField, SelectField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { contactSchema, type ContactFormData } from "@/lib/forms/schemas";

const TOPIC_OPTIONS = [
  { value: "", label: "Vyber téma (nepovinné)" },
  { value: "dotaz", label: "Obecný dotaz" },
  { value: "rezervace", label: "Rezervace / velká skupina" },
  { value: "spoluprace", label: "Spolupráce" },
  { value: "feedback", label: "Zpětná vazba" },
  { value: "jine", label: "Jiné" },
];

/**
 * Kontaktní formulář s honeypot ochranou, klientskou i serverovou validací.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      topic: "",
      message: "",
      website: "", // honeypot
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        reset();
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

  if (status === "success") {
    return (
      <div className="space-y-4">
        <Toast
          variant="success"
          message="Díky! Ozveme se co nejdřív (obvykle do 24 hodin)."
        />
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Poslat další zprávu
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <InputField
        label="Jméno"
        placeholder="Jan Novák"
        {...register("name")}
        error={errors.name?.message}
      />

      <InputField
        label="E-mail"
        type="email"
        placeholder="jan@domena.cz"
        {...register("email")}
        error={errors.email?.message}
      />

      <SelectField
        label="Téma"
        options={TOPIC_OPTIONS}
        {...register("topic")}
      />

      <TextareaField
        label="Zpráva"
        placeholder="Ahoj, chtěl(a) bych se zeptat na…"
        {...register("message")}
        error={errors.message?.message}
      />

      {/* Honeypot – skryté pole (vizuálně i pro screen reader) */}
      <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px]">
        <label htmlFor="website">Nevyplňujte</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {status === "error" && (
        <Toast
          variant="error"
          message={errorMsg}
          onClose={() => setStatus("idle")}
        />
      )}

      <Button type="submit" fullWidth size="lg" disabled={status === "loading"}>
        {status === "loading" ? "Odesílám…" : "Odeslat zprávu"}
      </Button>
    </form>
  );
}
