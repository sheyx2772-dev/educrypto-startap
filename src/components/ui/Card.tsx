import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  accentBorder?: boolean;
}

export function Card({
  accentBorder = false,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`card ${accentBorder ? "border-l-4 border-l-primary" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
