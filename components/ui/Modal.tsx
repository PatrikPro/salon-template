"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useCallback, type ReactNode } from "react";
import { FiX } from "react-icons/fi";

export interface ModalProps {
  /** Zda je modal otevřený */
  open: boolean;
  /** Callback na zavření */
  onClose: () => void;
  /** Titulek modalu (pro a11y aria-label) */
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * Přístupný modal s focus trapem, Escape klávesou a overlay close.
 * Používá nativní <dialog> element pro lepší a11y.
 */
export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Otevři/zavři dialog nativně
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Zavření přes Escape (nativní <dialog> to dělá, ale chceme synchronizovat state)
  const handleCancel = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      onClose();
    },
    [onClose]
  );

  // Zavření kliknutím na backdrop
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <dialog
      ref={dialogRef}
      aria-label={title}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      className={cn(
        // Reset dialog styles
        "backdrop:bg-coffee-900/40 backdrop:backdrop-blur-sm",
        "bg-transparent p-0 m-0 max-w-full max-h-full",
        "open:flex items-center justify-center",
        // Full viewport overlay
        "fixed inset-0 w-screen h-screen z-50"
      )}
    >
      <div
        className={cn(
          "bg-white rounded-2xl shadow-xl mx-4 max-w-lg w-full max-h-[85vh] overflow-y-auto",
          "p-6 relative",
          "animate-[modalIn_200ms_ease-out]",
          className
        )}
        role="document"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-cream-200 transition-colors"
          aria-label="Zavřít"
        >
          <FiX className="w-5 h-5 text-coffee-600" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-sans font-bold text-coffee pr-8 mb-4">
          {title}
        </h2>

        {children}
      </div>
    </dialog>
  );
}
