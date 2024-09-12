import { ButtonHTMLAttributes } from "react";

export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  id?: string;
  variant?: "primary" | "default" | "light";
  aniLetterSpacing?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "reset" | "submit";
  onClick?: () => void;
};
