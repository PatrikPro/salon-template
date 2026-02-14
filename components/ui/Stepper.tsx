"use client";

import { cn } from "@/lib/utils";
import { FiCheck } from "react-icons/fi";

export interface StepperProps {
  /** Popisky kroků */
  steps: string[];
  /** Aktuální krok (0-indexed) */
  currentStep: number;
}

/**
 * Vizuální stepper pro krokové formuláře.
 * Zobrazuje completed / active / upcoming stav každého kroku.
 */
export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <nav aria-label="Průběh formuláře" className="w-full">
      <ol className="flex items-center justify-between gap-2">
        {steps.map((label, i) => {
          const isCompleted = i < currentStep;
          const isActive = i === currentStep;

          return (
            <li
              key={label}
              className="flex-1 flex flex-col items-center gap-1.5"
              aria-current={isActive ? "step" : undefined}
            >
              {/* Číslo / check */}
              <span
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans font-bold transition-colors",
                  isCompleted && "bg-accent text-white",
                  isActive && "bg-coffee text-white",
                  !isCompleted && !isActive && "bg-cream-300 text-coffee-400"
                )}
              >
                {isCompleted ? (
                  <FiCheck className="w-4 h-4" aria-hidden="true" />
                ) : (
                  i + 1
                )}
              </span>

              {/* Label */}
              <span
                className={cn(
                  "text-xs font-sans text-center hidden sm:block",
                  isActive ? "text-coffee font-semibold" : "text-coffee-400"
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
