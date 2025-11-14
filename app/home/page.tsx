import { cn } from "@/components/shared";

{
  /* Main */
}
export default function Home() {
  return (
    <div className="px-4 mx-2 sm:ml-24 space-y-4 h-svh w-full overflow-y-scroll">
      <div
        className={cn(
          "sticky top-0 z-90 p-4 h-12",
          "border border-neutral-700 border-dashed",
          "bg-black/25 rounded-b-xs",
          "backdrop-blur-xl",
        )}
      >
        <p className="text-center">N</p>
      </div>

      <div className="p-4 rounded border h-1/3 border-red-300 border-dashed">
        Post Cretion Tools
      </div>

      <div
        className={cn(
          "p-4",
          "border-l border-r border-t border-neutral-400 border-dashed rounded",
        )}
      >
        {new Array(100).fill(0, 0, 100).map((_, v) => {
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
        })}
      </div>
    </div>
  );
}
