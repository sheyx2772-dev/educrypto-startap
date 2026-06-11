import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "accent" | "3d-primary" | "3d-accent";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  href?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-3d-primary",
  "3d-primary": "btn-3d-primary",
  outline: "btn-outline-duo",
  accent: "bg-accent hover:bg-accent/90 text-white font-bold py-3 px-8 rounded-full transition-all shadow-md active:scale-95",
  "3d-accent": "btn-3d-accent",
};

export function Button({
  variant = "primary",
  fullWidth = false,
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${variantClasses[variant]} ${fullWidth ? "w-full block text-center" : "inline-block"} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
