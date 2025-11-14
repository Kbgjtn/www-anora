export type Variant = "primary" | "secondary" | "outline";
export type Size = "sm" | "md" | "lg" | "fl";
export const cnd = " ";

type ClassNameValue = string | undefined;

export const cn = (...cns: ClassNameValue[]): string => {
  if (cns === undefined) {
    return "";
  }

  return cns.join(cnd);
};

export type Ratio = "original" | "1:1" | "4:5" | "16:9";
