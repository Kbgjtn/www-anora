"use client";

import { createContext, useContext, useState } from "react";

type ObjectState = {
  objects: Object[];
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
  get(i: number): Object;
  reset: () => void;
  push: (f: File) => void;
  pop: (i: number) => void;
  reorder: (from: number, to: number) => void;
  updateRatio: (i: number, r: number) => void;
  getRatio: (i: number) => number;
};

const ObjectContext = createContext<ObjectState>({} as ObjectState);

const DEFAULT_ASPECT_RATIO = 16 / 9;

export interface Object {
  meta?: { ratio?: number };
  f: File;
}

export function ObjectProvider({ children }: { children: React.ReactNode }) {
  const [objects, setObjects] = useState<Object[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const push = (file: File) => {
    setObjects((prev) => {
      const o = { f: file, meta: { ratio: DEFAULT_ASPECT_RATIO } } as Object;

      if (!prev) return [o]; // initialize if null

      const isDuplicate = prev.some(
        (obj) =>
          obj.f.name === file.name &&
          obj.f.size === file.size &&
          obj.f.type === file.type,
      );

      if (isDuplicate) {
        return prev;
      }

      return [...prev, o]; // append immutably
    });
  };

  const pop = (index: number) => {
    setObjects((prev) => {
      if (!isValidIndex(index, prev)) return prev;
      return prev.filter((_, i) => i !== index);
    });
  };

  const get = (i: number): Object => {
    return objects[i];
  };

  const updateRatio = (i: number, r: number) => {
    if (!objects[i].meta) {
      objects[i].meta = { ratio: r };
      return;
    }

    objects[i].meta.ratio = r;
  };

  const reset = () => {
    setObjects([]);
  };

  const reorder = (fromIndex: number, toIndex: number) => {
    setObjects((prev) => {
      const updatedFiles = [...prev];
      const [movedFile] = updatedFiles.splice(fromIndex, 1);
      updatedFiles.splice(toIndex, 0, movedFile);
      return updatedFiles;
    });
  };

  const getRatio = (i: number): number => {
    return objects[i].meta?.ratio || 1;
  };

  return (
    <ObjectContext
      value={{
        getRatio,
        get,
        objects,
        push,
        pop,
        reset,
        reorder,
        updateRatio,
        selectedIndex,
        setSelectedIndex,
      }}
    >
      {children}
    </ObjectContext>
  );
}

const isValidIndex = (idx: number, arr: Object[] | null): boolean => {
  return arr !== null && idx >= 0 && idx < arr.length;
};

// Custom hook for consuming the context
export const useObjectContext = () => useContext(ObjectContext);
