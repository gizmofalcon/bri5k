import { cn } from "@/lib/utils";

interface BrutalistButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg";
  className?: string;
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  "aria-label"?: string;
}

export function BrutalistButton({
  variant = "primary",
  size = "default",
  className,
  children,
  href,
  ...props
}: BrutalistButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-mono font-bold uppercase",
    "transition-[transform,opacity] duration-200 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]",
    "active:scale-[0.97]",
    variant === "primary" &&
      "bg-[var(--primary)] text-[var(--background)] border-[length:var(--border-heavy)] border-[var(--primary)]",
    variant === "secondary" &&
      "bg-transparent text-[var(--primary)] border-[length:var(--border-medium)] border-[var(--primary)]",
    variant === "ghost" &&
      "bg-transparent text-[var(--secondary)] border-[length:var(--border-light)] border-[var(--tertiary)]",
    size === "default" && "px-6 py-3 text-sm",
    size === "lg" && "px-10 py-4 text-base",
    className
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
