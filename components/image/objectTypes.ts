export type ObjectState = {
  objects: Object[];
  selectedIndex: number;
};

export type ObjectContextAttr = {
  setSelectedIndex: (i: number) => void;
  get(i: number): Object;
  reset: () => void;
  push: (f: File) => void;
  pop: (i: number) => void;
  reorder: (from: number, to: number) => void;
  setRatio: (i: number, r: number) => void;
  getRatio: (i: number) => number;
} & ObjectState;

export interface Object {
  meta?: { ratio?: number };
  f: File;
}

export type ObjectAction =
  | { type: "RESET" }
  | { type: "SET_SELECTED"; index: number }
  | { type: "PUSH"; file: File }
  | { type: "POP"; index: number }
  | { type: "REORDER"; from: number; to: number }
  | { type: "SET_RATIO"; index: number; ratio: number };
