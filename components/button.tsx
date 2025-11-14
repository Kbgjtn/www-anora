"use client";

import { ButtonHTMLAttributes } from "react";
import { Size, cn, Variant } from "./shared";

interface ButttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
}

const sizes: Record<Size, string> = {
  sm: "text-sm p-1 px-2 rounded-md",
  md: "text-md py-1.5 px-3 rounded-md",
  lg: "text-lg px-3.5 py-2 rounded-lg",
  fl: "inline-flex items-center align-middle text-sm px-2 py-1 rounded-md space-x-2",
};

const variants: Record<Variant, string> = {
  primary: cn(
    "text-white bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700",
    "dark:bg-white/90 dark:text-black dark:hover:bg-white/85 dark:active:bg-white/75",
  ),

  secondary: cn(
    "bg-black/15 hover:bg-black/10 active:bg-black/5",
    "dark:bg-current/15 dark:hover:bg-current/10 dark:active:bg-current/5",
  ),

  outline: cn(
    "border border-black/15 bg-white",
    "dark:border-white/10 dark:bg-neutral-900",
    "dark:disabled:hover:bg-neutral-900",
    "dark:[&:not(:disabled):hover]:bg-white/10",
    "dark:[&:not(:disabled):hover]:bg-black/10",
  ),
};

const base = cn(
  // base
  "disabled:opacity-65 disabled:cursor-not-allowed",
  "active:opacity-80",
);

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButttonProps) {
  const style = cn(base, sizes[size], variants[variant], className);

  return (
    <button className={style} {...props}>
      {props.children}
    </button>
  );
}
