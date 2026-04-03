import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

export type BadgeVariant = "default" | "accent" | "outline";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-luna-champagne/90 text-luna-stone",
  accent: "bg-luna-rose/30 text-luna-ink",
  outline: "border border-luna-champagne text-luna-stone bg-transparent",
};

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-sans font-medium tracking-wide",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
