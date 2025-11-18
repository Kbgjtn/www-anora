"use client";

// DropdownMenuContext.tsx
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";

interface DropdownContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  registerItem: (el: HTMLDivElement) => void;
  unregisterItem: (el: HTMLDivElement) => void;
  focusItemByIndex: (index: number) => void;
}

const DropdownContext = createContext<DropdownContextProps | undefined>(
  undefined,
);

export const useDropdown = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx)
    throw new Error("DropdownMenu components must be used within DropdownMenu");
  return ctx;
};

export const DropdownProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<HTMLDivElement[]>([]);

  const registerItem = (el: HTMLDivElement) => {
    setItems((prev) => [...prev, el]);
  };
  const unregisterItem = (el: HTMLDivElement) => {
    setItems((prev) => prev.filter((x) => x !== el));
  };

  const focusItemByIndex = (index: number) => {
    const item = items[index];
    if (item) {
      item.focus();
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (open) {
        const trigger = triggerRef.current;
        const content = contentRef.current;
        if (
          trigger &&
          !trigger.contains(e.target as Node) &&
          content &&
          !content.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  // Keyboard: handle up/down/home/end/escape within content
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      const currentIndex = items.findIndex(
        (item) => item === document.activeElement,
      );
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = (currentIndex + 1) % items.length;
        focusItemByIndex(next);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (currentIndex - 1 + items.length) % items.length;
        focusItemByIndex(prev);
      } else if (e.key === "Home") {
        e.preventDefault();
        focusItemByIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        focusItemByIndex(items.length - 1);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      } else if (e.key === "Enter" || e.key === " ") {
        // letting item handle click
      }
    };

    content.addEventListener("keydown", handleKeyDown);
    return () => {
      content.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, items]);

  return (
    <DropdownContext.Provider
      value={{
        open,
        setOpen,
        triggerRef,
        contentRef,
        registerItem,
        unregisterItem,
        focusItemByIndex,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};
