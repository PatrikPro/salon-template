"use client";

import type { ReservationSettings } from "@/lib/booking";
import { Button } from "@/components/ui/Button";

export function ReservationWidget({ settings }: { settings: ReservationSettings }) {
  const openExternal = () => {
    window.open(settings.bookingUrl, "_blank", "noopener,noreferrer");
  };

  if (settings.bookingMode === "iframe" && settings.iframeUrl) {
    return (
      <div className="space-y-6">
        {settings.helperText && (
          <p className="text-luna-stone font-sans text-center text-base leading-relaxed max-w-xl mx-auto">
            {settings.helperText}
          </p>
        )}
        <div className="relative w-full rounded-lg overflow-hidden border border-luna-champagne bg-white shadow-sm">
          <div className="aspect-[4/5] md:aspect-[16/11] w-full min-h-[520px]">
            <iframe
              title={`Rezervace – ${settings.providerName}`}
              src={settings.iframeUrl}
              className="absolute inset-0 w-full h-full"
              allow="fullscreen"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="text-center">
          <Button variant="secondary" type="button" onClick={openExternal}>
            Otevřít rezervace v novém okně
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6 max-w-lg mx-auto">
      {settings.helperText && (
        <p className="text-luna-stone font-sans text-lg leading-relaxed">
          {settings.helperText}
        </p>
      )}
      <Button size="lg" type="button" onClick={openExternal} className="min-w-[240px]">
        {settings.ctaLabel}
      </Button>
      <p className="text-sm text-luna-stone/80 font-sans">
        Otevře se {settings.providerName} v nové kartě.
      </p>
    </div>
  );
}
