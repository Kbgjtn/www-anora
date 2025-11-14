"use client";

import { cn } from "@/components/shared";
import { ChangeEvent, useState } from "react";

import ImagePreview from "@/components/image/preview";
import Image from "@/components/image";
import Input from "@/components/input";

const DEFAULT_IMAGE_URL = "/404";

export default function Home() {
  const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE_URL);

  function handleChangeImageURL(e: ChangeEvent<HTMLInputElement>) {
    const v = e.currentTarget.value;
    if (v.length === 0) return;
    setImageUrl(v);
  }

  return (
    <div className="flex min-h-screen max-md:flex-col mx-auto gap-4">
      <aside className="max-w-md max-md:min-w-full items-center">
        <a href="/" title="coocobolo">
          <img
            src="/icon.svg"
            alt=""
            width={12}
            height={12}
            className="w-12 max-md:w-8 max-md:mx-auto mt-4 p-2 max-md:p-1 dark:grayscale-100 grayscale-30"
          />
        </a>
        <p className="w-12"></p>
      </aside>
      <main className="h-full flex flex-col gap-4 shrink-0 w-4/5 max-md:pl-2">
        <div className="h-2" />
        <ImagePreview className="w-full">
          <Image src={imageUrl} alt="none" />
        </ImagePreview>

        <code className="opacity-50 select-all text-[12px] font-mono w-full text-wrap">
          <span className="block select-none">Sample:</span>
          https://images.pexels.com/photos/34639114/pexels-photo-34639114.jpeg
        </code>
        <div className="w-4/5 md:w-1/4">
          <Input
            className={cn("w-full")}
            placeholder="Enter an image url"
            type="url"
            autoFocus
            // aria-label="image URL"
            autoComplete="url"
            autoCorrect="on"
            maxLength={256}
            minLength={12}
            name="image_url"
            onChange={handleChangeImageURL}
          />
        </div>
        <div className="h-8"></div>
      </main>
    </div>
  );
}
