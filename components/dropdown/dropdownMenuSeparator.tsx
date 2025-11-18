import React from "react";

interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  className?: string;
}

export const DropdownMenuSeparator: React.FC<SeparatorProps> = ({
  className,
  ...rest
}) => {
  return <hr role="separator" className={className} {...rest} />;
};
