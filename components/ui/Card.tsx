import { cn } from "@/lib/utils";
import { type HTMLAttributes, forwardRef } from "react";
import Image from "next/image";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Zda má kartu obklopovat hover efekt */
  hoverable?: boolean;
}

/**
 * Univerzální karta – kontejner s rounded rohy, stínem a volitelným hover.
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hoverable = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl bg-white shadow-sm border border-cream-300",
          "overflow-hidden transition-all duration-200",
          hoverable &&
            "hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

/* Podkomponenty pro strukturu */

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

function CardImage({ src, alt, className }: CardImageProps) {
  return (
    <div className={cn("relative w-full h-48", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading="lazy"
      />
    </div>
  );
}

function CardBody({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-5", className)} {...props}>
      {children}
    </div>
  );
}

export { Card, CardImage, CardBody };
