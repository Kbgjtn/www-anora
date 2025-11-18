"use client";

import React, { useEffect } from "react";
import { useDropdown } from "./dropDownMenuContext";

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  ContentProps
>(({ children, className, ...rest }, ref) => {
  const { open, contentRef } = useDropdown();

  return open ? (
    <div
      ref={(node) => {
        if (ref) {
          if (typeof ref === "function") ref(node);
          else (ref as React.RefObject<HTMLDivElement | null>).current = node;
        }
        contentRef.current = node!;
      }}
      role="menu"
      tabIndex={-1}
      className={className}
      {...rest}
    >
      {children}
    </div>
  ) : null;
});
