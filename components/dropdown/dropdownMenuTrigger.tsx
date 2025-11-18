import React from "react";
import { useDropdown } from "./dropDownMenuContext";

interface TriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const DropdownMenuTrigger = React.forwardRef<
  HTMLDivElement,
  TriggerProps
>(({ children, className, ...rest }, ref) => {
  const { open, setOpen, triggerRef } = useDropdown();
  return (
    <div
      ref={(node) => {
        // support both forwarded ref and context ref
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.RefObject<HTMLDivElement | null>).current = node;
        triggerRef.current = node!;
      }}
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
});
