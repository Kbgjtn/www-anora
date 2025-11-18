"use client";

import React, { useEffect, useRef } from "react";
import { useDropdown } from "./dropDownMenuContext";

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  onSelect?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const DropdownMenuItem: React.FC<ItemProps> = ({
  onSelect,
  disabled = false,
  children,
  className,
  ...rest
}) => {
  const { registerItem, unregisterItem, setOpen, triggerRef } = useDropdown();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) registerItem(ref.current);
    return () => {
      if (ref.current) unregisterItem(ref.current);
    };
  }, [registerItem, unregisterItem]);

  const handleClick = () => {
    if (disabled) return;
    onSelect?.();
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div
      ref={ref}
      role="menuitem"
      tabIndex={disabled ? undefined : -1}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) {
          e.preventDefault();
          handleClick();
        }
      }}
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
};
