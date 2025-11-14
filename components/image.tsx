"use client";

import { cn } from "./shared";
import { ErrorPrompt } from "./empty";
import { FC, ImgHTMLAttributes, useState } from "react";

import Empty from "./empty";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

type ImageState =
  | 0 // unload
  | 1 // loaded
  | 2; // error_load

const FALLBACK_IMAGE_URL =
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExajZ3dzFqN25nZTJubTRwcHoyaHY4cWN1Y3V2MnhmZ2RkZ2Zpa3dpOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iWtJ5W7knDY0X5b1gI/giphy.gif";
// "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjVueGdzYzJzdTM5OGloeGJqcmduaHZ5dGpseTBpZ2RrZDRuMXpzcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SXTSqlVRu9pcvwLIRk/giphy.gif";
// "https://tailwindcss.com/_next/static/media/keyboard-dark.d0689e65.png";
// "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F719762.jpg&f=1&nofb=1&ipt=ecddebc35b5a737f172555c4c4a3f0b7cc0f8e48c04664c804d1f6f546f36257";
// "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.publicdomainpictures.net%2Fpictures%2F280000%2Fvelka%2Fnot-found-image-15383864787lu.jpg&f=1&nofb=1&ipt=a6be62269ac5301b8ada562e9a2e8345fea480ae286197a64b8f1a989b991d06";

const Image: FC<ImageProps> = ({ className, ...props }) => {
  const [imgState, setImgState] = useState<number>(0);

  return (
    <>
      <img
        className={cn(
          imgState === 2 ? "hidden" : "visible",
          "bg-transparent text-transparent",
          "transition-all duration-100",
          "ease-in-out",
          className,
        )}
        loading="lazy"
        onLoad={() => setImgState(1)}
        onError={() => setImgState(2)}
        onChange={(e) => console.log("change src: ", e.currentTarget.src)}
        {...props}
      />

      <Empty hidden={imgState !== 2}>
        <img
          className={cn(
            "h-3/6 max-w-3/4 object-cover rounded-lg",
            "opacity-75 invert-5 grayscale-100 group-hover:opacity-100",
            "dark:blur-xs dark:group-hover:blur-none",
            "dark:opacity-45 dark:invert-5 dark:grayscale-100 dark:group-hover:opacity-55 dark:group-hover:grayscale-50",
            "mask-radial-[100%_100%] mask-radial-from-40% mask-radial-at-left",
            "dark:mask-radial-[100%_100%] dark:mask-radial-from-10% dark:mask-radial-at-left",
            "duration-100 transition-all",
          )}
          src={FALLBACK_IMAGE_URL}
          draggable="false"
        />
        <ErrorPrompt
          header="404 not found"
          title="Broken Image, Duh!."
          description="There was an issue loading the image you sought."
          cshref="/support"
        />
      </Empty>
    </>
  );
};

export default Image;
