"use client";

import { usePosterContext } from "@/components/post/context";
import { cn } from "@/components/shared";
import { useState } from "react";

import UploadForm from "@/components/image/form";
import PosterCard from "@/components/post/card";

const DEFAULT_PAGE_SIZE = 10;

export default function Home() {
  const poster = usePosterContext();
  const [page, _] = useState<number>(1);
  const posters = poster.get(page, DEFAULT_PAGE_SIZE);

  return (
    <>
      <div className="px-4 mt-12 space-y-4 w-full md:max-w-prose md:mx-auto overflow-y-scroll">
        <div className="rounded border border-dashed border-transparent p-4 mt-4">
          <UploadForm />
        </div>

        <div
          className={cn(
            "p-4",
            "border-l border-r border-t border-transparent border-dashed rounded",
          )}
        >
          {posters &&
            posters.length > 0 &&
            posters.map((poster, i) => (
              <div key={i}>
                <PosterCard poster={poster} />
              </div>
            ))}

          {/* {new Array(10).fill(0, 0, 10).map((_, v) => {
          return (
            <div key={v}>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center justify-center h-24 rounded bg-white/5 border border-dashed border-neutral-600">
                  {"sc" + v}
                </div>
                <div className="flex items-center justify-center h-24 rounded bg-white/5 border border-dashed border-neutral-600">
                  {"sc" + v}
                </div>
                <div className="flex items-center justify-center h-24 rounded bg-white/5 border border-dashed border-neutral-600">
                  {"sc" + v}
                </div>
              </div>

              <div className="flex items-center justify-center h-48 rounded bg-neutral-900 mb-4 border border-dashed border-neutral-800"></div>
            </div>
          );
        })} */}
        </div>
      </div>
    </>
  );
}
