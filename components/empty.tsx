import { cn } from "./shared";
import { FC, HTMLAttributes } from "react";

interface EmptyProps extends HTMLAttributes<HTMLElement> {
  hidden: boolean;
}

interface ErrorProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  header?: string;
  description?: string;
  cshref?: string;
}

export const ErrorPrompt: FC<ErrorProps> = ({
  title,
  header,
  description,
  children,
  className,
  cshref: cshref,
  ...props
}) => {
  return (
    <div className={cn("font-medium", className)} {...props}>
      <p className="font-mono text-sm text-current/90 uppercase dark:text-current/60">
        {header}
      </p>
      <p className="mt-2 text-base dark:text-current/80">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-balance dark:text-current/60">
        {description}
      </p>

      {children}

      {cshref && (
        <span className="mt-1 text-xs leading-relaxed text-balance dark:text-current/65">
          Need help?{" "}
          <a target="_blank" href={cshref} autoSave="false">
            Contact Support
          </a>
        </span>
      )}
    </div>
  );
};

const Empty: FC<EmptyProps> = ({ hidden, className, children, ...props }) => {
  return (
    <div
      className={cn(
        hidden ? "hidden" : "visible",
        "h-full w-full",
        "flex items-center gap-2",
        "transition-all duration-[2s,4s]",
        "ease-in-out group",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Empty;