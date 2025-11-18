import { cn } from "@/components/shared";
import { Metadata } from "next";

import UploadForm from "@/components/image/form";

export const metadata: Metadata = {
  title: "Home",
  description: "home",
};

export default function Home() {
  return (
    <div
      className={cn(
        "p-4 mt-4",
        "border-0 rounded border-dashed border-amber-300",
      )}
    >
      <UploadForm />

      {/* TODO: Post News Feed  */}
    </div>
  );
}
