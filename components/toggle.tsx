import { Button } from "./button";
import { cn, Size, Variant } from "./shared";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  toggleAccent?: string;
  selected?: boolean;
  children: ReactNode;
}

const base = cn(
  "flex gap-2 items-center",
  "px-4",
  "active:opacity-100",

  "data-[toggle=off]:opacity-75",
  "data-[toggle=on]:opacity-100",

  "data-[toggle=off]:*:[svg]:fill-current/15",
  "data-[toggle=off]:*:[svg]:stroke-current/0",
  "data-[toggle=on]:*:[svg]:stroke-none",
);

export function Toggle({
  variant,
  selected,
  size,
  toggleAccent = "current",
  title,
  value,
  className,
  ...props
}: ToggleProps) {
  const style = cn(base, accent[toggleAccent], className);

  return (
    <Button
      size={size}
      variant={variant || "outline"}
      data-toggle={selected ? "on" : "off"}
      title={title ? title : `Toggle ${value}: ${selected ? "on" : "off"}`}
      className={style}
      {...props}
    >
      {props.children}
    </Button>
  );
}

let accent: Record<string, string> = {
  neutral: cn(
    "data-[toggle=on]:*:[svg]:fill-neutral-500",
    "data-[toggle=on]:dark:border-neutral-900",
  ),
  current: cn(
    "data-[toggle=on]:*:[svg]:fill-current",
    "data-[toggle=on]:dark:border-current/80",
  ),
  blue: cn(
    "data-[toggle=on]:*:[svg]:fill-blue-400",
    "data-[toggle=on]:dark:border-blue-400",
  ),
  red: cn(
    "data-[toggle=on]:*:[svg]:fill-red-400",
    "data-[toggle=on]:dark:border-red-400",
  ),
  lime: cn(
    "data-[toggle=on]:*:[svg]:fill-lime-400",
    "data-[toggle=on]:dark:border-lime-400",
  ),
  amber: cn(
    "data-[toggle=on]:*:[svg]:fill-amber-400",
    "data-[toggle=on]:dark:border-amber-400",
  ),
  pink: cn(
    "data-[toggle=on]:*:[svg]:fill-pink-400",
    "data-[toggle=on]:dark:border-pink-400",
  ),
  purple: cn(
    "data-[toggle=on]:*:[svg]:fill-purple-400",
    "data-[toggle=on]:dark:border-purple-400",
  ),
};

// let size: Record<Size, string> = {
//   sm: "text-sm p-1 px-2 rounded-md",
//   md: "text-md py-1.5 px-3 rounded-md",
//   lg: "text-lg px-3.5 py-2 rounded-lg",
// };

// let variant: Record<Variant, string> = {
//   primary: [
//     "text-white bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700",
//     "dark:bg-white/90 dark:text-black dark:hover:bg-white/85 dark:active:bg-white/75",
//   ].join(" "),
//   secondary: [
//     "bg-black/15 hover:bg-black/10 active:bg-black/5",
//     "dark:bg-white/15 dark:hover:bg-white/10 dark:active:bg-white/5",
//   ].join(" "),
//   outline: [
//     "border border-black/15 bg-white hover:bg-black/10",
//     "dark:border-white/10 dark:bg-neutral-900 dark:hover:bg-white/10",
//   ].join(" "),
// };

{
  /* {React.Children.map(p.children, (child) => {
        if (React.isValidElement<IconProps>(child) && child.type === Icon) {
          return React.cloneElement(child, {
            // className: [
            //   "inline-block",
            //   p.selected ? "fill-red-500" : "fill-white/25",
            //   child.props.className,
            // ].join(" "),
            ...{
              ...child.props,
              className: [
                "inline-block",
                p.selected ? "fill-red-500" : "fill-white/25",
                child.props.className && child.props.className,
              ].join(" "),
            },
          });
        }

        return child;
      })} */
}
