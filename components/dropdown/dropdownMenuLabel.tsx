import React from "react";

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const DropdownMenuLabel: React.FC<LabelProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div role="presentation" className={className} {...rest}>
      {children}
    </div>
  );
};
