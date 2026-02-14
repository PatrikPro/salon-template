import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

export type BadgeVariant = "default" | "accent" | "outline";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-cream-300 text-coffee-700",
  accent: "bg-accent-100 text-accent-700",
  outline: "border border-coffee-200 text-coffee-600 bg-transparent",
};

/**
 * Badge / Tag – malý label pro kategorie, tagy, stavy.
 */
export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-sans font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
