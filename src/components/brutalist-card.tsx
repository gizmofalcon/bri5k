import { cn } from "@/lib/utils";
import { type HTMLAttributes, forwardRef } from "react";

interface BrutalistCardProps extends HTMLAttributes<HTMLDivElement> {
  weight?: "heavy" | "medium" | "light";
}

const BrutalistCard = forwardRef<HTMLDivElement, BrutalistCardProps>(
  ({ className, weight = "medium", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          weight === "heavy" &&
            "bg-[var(--surface-elevated)] border-[length:var(--border-heavy)] border-[var(--primary)] p-5",
          weight === "medium" &&
            "bg-[var(--surface)] border-[length:var(--border-medium)] border-[var(--primary)]/50 p-4",
          weight === "light" &&
            "bg-[var(--background)] border-[length:var(--border-light)] border-[var(--tertiary)] p-3",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BrutalistCard.displayName = "BrutalistCard";

export { BrutalistCard };
