"use client";

import { Object } from "../image/context";
import { createContext, useContext, useState } from "react";

export type Poster = {
  id: string;
  content?: string;
  objects?: Object[];
  createdAt: number;
  analytics: {
    like: number;
    comment: number;
    engagement: number;
  };
};

type PosterState = {
  posters: Poster[];
  get: (p: number, n: number) => Poster[];
  push: (p: Poster) => void;
  pop: (i: number) => void;
};

const PosterContext = createContext<PosterState>({} as PosterState);

function PosterProvider({ children }: { children: React.ReactNode }) {
  const [posters, setPosters] = useState<Poster[]>([]);

  const push = (poster: Poster) => {
    setPosters((prev) => {
      if (!prev) return [poster]; // initialize if null

      return [...prev, poster]; // append immutably
    });
  };

  const get = (page: number, size: number): Poster[] => {
    const start = (page - 1) * size;
    const end = start + size;

    const list = posters.slice(start, end);
    const sorted = [...list].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return sorted;
  };

  const pop = (index: number) => {
    setPosters((prev) => {
      if (!isValidIndex(index, prev)) return prev;
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <PosterContext
      value={{
        get,
        posters,
        pop,
        push,
      }}
    >
      {children}
    </PosterContext>
  );
}

const isValidIndex = (idx: number, arr: Poster[] | null): boolean => {
  return arr !== null && idx >= 0 && idx < arr.length;
};

export const usePosterContext = () => useContext(PosterContext);

export default PosterProvider;
