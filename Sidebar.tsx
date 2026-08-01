import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  full?: boolean;
};

export function Button({ variant = "primary", icon, full, className = "", children, ...props }: Props) {
  return (
    <button className={`button button--${variant} ${full ? "button--full" : ""} ${className}`} {...props}>
      {icon}
      {children}
    </button>
  );
}
