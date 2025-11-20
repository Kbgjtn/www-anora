"use client";

import { cn, Variant } from "./shared";
import { FC, InputHTMLAttributes, useId, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: Variant;
}

const base = cn(
  "block",
  "border rounded",
  "px-2 py-1 text-sm",
  "focus:outline-2",
  "disabled:opacity-50",
  "invalid:outline-0",
  // "focus:outline-offset-1",
  // "invalid:outline-offset-1",
  // "invalid:focus:outline-offset-1",
  "invalid:outline-red-400",
  "invalid:focus:outline-red-400",
  "dark:border-white/25",
  "dark:focus:outline-neutral-600",
  "dark:focus:border-white/50",
  "dark:text-neutral-300",
  "dark:placeholder:text-neutral-500",
);

const Input: FC<InputProps> = ({ title, id, className, ...props }) => {
  const style = cn(base, className);
  const reactId = useId();
  const inputId = id ?? reactId;

  const [validationMessage, setValidationMessage] = useState<string>("");

  return (
    <div>
      {title && (
        <label
          className={cn(
            "inline-block capitalize mb-1.5 select-none",
            "dark:text-neutral-300",
            "dark:active:opacity-85",
            props.required
              ? "after:content-['*'] after:text-red-400 after:text-xs after:align-top after:font-mono"
              : "",
          )}
          htmlFor={inputId}
        >
          {title}
        </label>
      )}

      <input
        id={inputId}
        className={style}
        aria-describedby={`${inputId}-error`}
        onChangeCapture={(e) => {
          const el = e.currentTarget;
          if (!el.validity.valid) {
            setValidationMessage(el.validationMessage.toString());
            return;
          }
          setValidationMessage("");
        }}
        {...props}
      />

      <div className="inline-flex flex-col">
        <p
          id={`${inputId}-error`}
          className={cn(
            "text-[8px] text-red-400 wrap-break-word pt-0.5 transition-opacity",
            validationMessage ? "opacity-100" : "opacity-0",
          )}
          aria-live="polite"
        >
          {validationMessage || " "}
        </p>
      </div>
    </div>
  );
};

export default Input;
