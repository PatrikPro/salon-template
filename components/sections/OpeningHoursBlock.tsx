import { loadOpeningHours } from "@/lib/cms/loadContent";
import { FiClock } from "react-icons/fi";

export async function OpeningHoursBlock() {
  const hours = await loadOpeningHours();

  return (
    <div className="rounded-2xl border border-luna-champagne/80 bg-white/80 p-8 md:p-10 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-luna-rose/20 text-luna-ink">
          <FiClock className="w-5 h-5" aria-hidden />
        </span>
        <h2 className="text-2xl font-serif font-medium text-luna-ink">
          Otevírací doba
        </h2>
      </div>
      <ul className="space-y-2 font-sans text-luna-stone">
        {hours.days.length === 0 ? (
          <li>Doplňte content/openingHours.json</li>
        ) : (
          hours.days.map((d) => (
            <li
              key={d.id}
              className="flex flex-wrap justify-between gap-2 border-b border-luna-champagne/40 pb-2 last:border-0"
            >
              <span className="text-luna-ink font-medium">{d.label}</span>
              <span>
                {d.closed ? d.note ?? "Zavřeno" : d.hours ?? "—"}
              </span>
            </li>
          ))
        )}
      </ul>
      {hours.note && (
        <p className="mt-4 text-sm text-luna-stone/80 font-sans">{hours.note}</p>
      )}
    </div>
  );
}
