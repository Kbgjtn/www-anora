import { cn } from "@/components/shared";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* SideBar */}
      <aside
        className={cn(
          "h-full w-24 px-4 fixed top-0 left-0",
          "-translate-x-full sm:translate-x-0",
        )}
      >
        <div className="p-4 border rounded h-svh border-dashed border-lime-300">
          <a href="/home" title="coocobolo">
            <img
              src="/icon.svg"
              alt=""
              width={12}
              height={12}
              className="w-12 max-md:w-8 max-md:mx-auto mt-4 max-md:p-1 dark:grayscale-100 grayscale-30"
            />
          </a>
        </div>
      </aside>
      {children}
    </div>
  );
}
