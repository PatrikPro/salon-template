import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ className, hoverable, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white/90 shadow-sm border border-luna-champagne/80 backdrop-blur-sm",
        hoverable &&
          "transition-all duration-300 hover:shadow-md hover:border-luna-rose/40 hover:-translate-y-0.5",
        className
      )}
      {...props}
    />
  );
}

export function CardBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6", className)} {...props} />;
}
