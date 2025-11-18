// DropdownMenu.tsx
import React from "react";
import { DropdownProvider } from "./dropDownMenuContext";

export const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <DropdownProvider>{children}</DropdownProvider>;
};
