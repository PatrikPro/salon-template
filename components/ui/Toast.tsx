"use client";

import { cn } from "@/lib/utils";
import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";

export type ToastVariant = "success" | "error";

export interface ToastProps {
  variant: ToastVariant;
  message: string;
  /** Callback na zavření – pokud není, nezobrazí se X */
  onClose?: () => void;
  className?: string;
}

/**
 * Inline alert / toast pro stavové hlášky (success/error).
 */
export function Toast({ variant, message, onClose, className }: ToastProps) {
  const Icon = variant === "success" ? FiCheckCircle : FiAlertCircle;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "flex items-start gap-3 rounded-lg px-4 py-3 text-sm font-sans",
        variant === "success" && "bg-accent-100 text-accent-700 border border-accent-200",
        variant === "error" && "bg-red-50 text-red-700 border border-red-200",
        className
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
      <p className="flex-1">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-0.5 rounded hover:bg-black/5 transition-colors"
          aria-label="Zavřít hlášku"
        >
          <FiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
