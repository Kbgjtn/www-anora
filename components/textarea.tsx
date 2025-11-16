"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "./shared";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoGrow?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  autoGrow = true,
  onInput,
  className,
  value,
  ...props
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (autoGrow && ref.current) {
      const textarea = ref.current;
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }

    if (onInput) onInput(e);
  };

  const adjustHeight = () => {
    if (autoGrow && ref.current) {
      const textarea = ref.current;
      textarea.style.height = "auto"; // reset
      textarea.style.height = textarea.scrollHeight + "px"; // set new height
    }
  };

  // adjust height whenever value changes programmatically
  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      value={value}
      {...props}
      inputMode="text"
      ref={ref}
      onInput={handleInput}
      onChangeCapture={handleInput}
      rows={props.rows ?? (autoGrow ? 1 : 3)}
      className={cn(
        "w-full max-h-64",
        "appearance-none border rounded px-3.5 py-2.5 overflow-y-auto",
        autoGrow ? "resize-none overflow-hidden" : "resize-y",
        className,
      )}
    />
  );
};
