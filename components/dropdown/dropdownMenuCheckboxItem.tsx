"use client";

import React, { useEffect, useRef } from "react";
import { useDropdown } from "./dropDownMenuContext";

interface CheckboxItemProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const DropdownMenuCheckboxItem: React.FC<CheckboxItemProps> = ({
  checked,
  onCheckedChange,
  disabled = false,
  children,
  className,
}) => {
  const { registerItem, unregisterItem } = useDropdown();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) registerItem(ref.current);
    return () => {
      if (ref.current) unregisterItem(ref.current);
    };
  }, [registerItem, unregisterItem]);

  const toggle = () => {
    if (disabled) return;
    onCheckedChange(!checked);
  };

  return (
    <div
      ref={ref}
      role="menuitemcheckbox"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? undefined : -1}
      onClick={toggle}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) {
          e.preventDefault();
          toggle();
        }
      }}
      className={className}
    >
      {children}
    </div>
  );
};
