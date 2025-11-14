"use client";

import { FC, InputHTMLAttributes, useState } from "react";
import { cn, Variant } from "./shared";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: Variant;
}

const base = cn(
  "block",
  "border rounded",
  "px-2 py-1 text-sm",
  // "focus:outline-offset-1",
  "focus:outline-2",
  "disabled:opacity-50",
  "invalid:outline-0",
  // "invalid:outline-offset-1",
  "invalid:outline-red-400",
  "invalid:focus:outline-red-400",
  // "invalid:focus:outline-offset-1",
  "dark:border-white/25",
  "dark:focus:outline-neutral-600",
  "dark:focus:border-white/50",
  "dark:text-neutral-300",
  "dark:placeholder:text-neutral-500",
);

const Input: FC<InputProps> = ({ className, children, ...props }) => {
  const style = cn(base, className);
  const title = props["aria-label"];
  const label = title?.replaceAll(" ", "_");
  const required = props.required;

  const [validationMessage, setValidationMessage] = useState<string>("");

  return (
    <>
      <div>
        {label && (
          <label
            className={cn(
              "inline-block capitalize mb-1.5 select-none",
              "dark:text-neutral-300",
              "dark:active:opacity-85",
              required
                ? "after:content-['*'] after:text-red-400 after:text-xs after:align-top after:font-mono"
                : "",
            )}
            htmlFor={label}
          >
            {title}
          </label>
        )}

        <input
          id={label}
          className={style}
          onChangeCapture={(e) => {
            console.log({
              event: "onChangeCapture",
              validity: e.currentTarget.validity,
              validationMessage: e.currentTarget.validationMessage,
            });

            if (!e.currentTarget.validity.valid) {
              setValidationMessage(
                e.currentTarget.validationMessage.toString(),
              );
              return;
            }

            setValidationMessage("");
          }}
          {...props}
        >
          {children}
        </input>

        {/* <p
            className={cn(
              "absolute -right-4 -top-0.5",
              "after:content-['!'] after:text-red-400 after:text-sm after:align-top after:font-mono",
            )}
            title={"lorem ipsum"}
          /> */}

        <div className="inline-flex">
          <label htmlFor={label}>
            <p
              className={cn(
                "inline-block text-wrap align-top pt-0.5",
                "text-[8px] text-red-400",
                "wrap-break-word",
                validationMessage ? "visible" : "hidden",
              )}
            >
              {validationMessage}
            </p>
          </label>
        </div>
      </div>
    </>
  );
};

export default Input;
