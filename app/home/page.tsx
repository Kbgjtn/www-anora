import { cn } from "@/components/shared";
import { Metadata } from "next";

import UploadForm from "@/components/image/form";
import Form from "@/components/post/form";

export const metadata: Metadata = {
  title: "Home",
  description: "home",
};

export default function Home() {
  return (
    <div className={cn("p-4 mt-2", "rounded-lg")}>
      <Form />

      {/* TODO: Post News Feed  */}
    </div>
  );
}
