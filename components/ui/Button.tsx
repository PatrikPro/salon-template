import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

/** Varianty tlačítka */
export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Celá šířka kontejneru */
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-coffee text-white hover:bg-coffee-600 focus-visible:ring-coffee/50 shadow-sm",
  secondary:
    "bg-cream-300 text-coffee-800 hover:bg-cream-400 focus-visible:ring-cream-400/50 shadow-sm",
  ghost:
    "bg-transparent text-coffee hover:bg-cream-200 focus-visible:ring-coffee/30",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

/**
 * Univerzální tlačítko s variantami a velikostmi.
 * Podporuje forwardRef pro použití s formulářovými knihovnami.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base
          "inline-flex items-center justify-center gap-2 rounded-lg font-sans font-semibold",
          "transition-all duration-200 ease-in-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          // Varianta + velikost
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
