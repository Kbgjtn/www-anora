import { ReactNode } from "react";
import { cn } from "@/components/shared";
import { ObjectProvider } from "@/components/image/context";

import PosterProvider from "@/components/post/context";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Navigation */}
      <div
        className={cn(
          "flex items-center justify-stretch gap-2",
          "fixed w-full top-0 z-10 p-4 h-12",
          "border border-neutral-700 border-dashed",
          "bg-black/25 rounded-xs",
          "backdrop-blur-xl",
        )}
      >
        <div className="flex gap-4 w-max">
          <a href="/home" title="coocobolo">
            <img
              src="/icon.svg"
              alt=""
              className="w-6 h-6 dark:grayscale-100 grayscale-30"
            />
          </a>
        </div>

        <div className="flex w-full justify-around">
          <p className="text-center">S</p>
        </div>
      </div>

      {/* SideBar */}
      <aside
        className={cn(
          "h-svh w-16 pr-4 fixed top-0 left-0",
          "-translate-x-full md:translate-x-0",
          "border rounded dark:bg-neutral-900/50 border-dashed border-neutral-700",
        )}
      >
        <div className="p-4">SB</div>
      </aside>

      {/* Main */}
      <PosterProvider>
        <ObjectProvider>{children}</ObjectProvider>
      </PosterProvider>
    </div>
  );
}
