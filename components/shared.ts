export type Variant = "primary" | "secondary" | "outline" | "ghost";
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
export type SupportedRatioType =
  | "auto"
  | "1:1"
  | "2:1"
  | "3:2"
  | "4:3"
  | "16:9";

export const ratios: Record<string, number> = {
  "1:1": 1 / 1,
  "2:1": 2 / 1,
  "3:2": 3 / 2,
  "4:3": 4 / 3,
  "16:9": 16 / 9,
};

export const ratiosIds = Object.keys(ratios);
