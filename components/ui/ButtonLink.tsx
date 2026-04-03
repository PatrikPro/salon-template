import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonVariant, ButtonSize } from "./Button";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-luna-ink text-luna-ivory hover:bg-luna-stone focus-visible:ring-luna-rose/50 shadow-sm",
  secondary:
    "bg-luna-champagne text-luna-ink hover:bg-luna-champagne/80 border border-luna-champagne focus-visible:ring-luna-stone/30",
  ghost:
    "bg-transparent text-luna-ink hover:bg-luna-champagne/50 focus-visible:ring-luna-ink/20",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-8 py-3.5 text-lg",
};

export interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-md font-sans font-semibold tracking-wide transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-luna-ivory";

/**
 * Odkaz stylovaný jako tlačítko (interní Next.js nebo absolutní URL).
 */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
}: ButtonLinkProps) {
  const classes = cn(
    baseClass,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className
  );

  if (href.startsWith("http://") || href.startsWith("https://")) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
