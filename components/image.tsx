"use client";

import { cn } from "./shared";
import { ErrorPrompt } from "./empty";
import { FC, ImgHTMLAttributes, useState } from "react";

import Empty from "./empty";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

const FALLBACK_IMAGE_URL =
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExajZ3dzFqN25nZTJubTRwcHoyaHY4cWN1Y3V2MnhmZ2RkZ2Zpa3dpOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iWtJ5W7knDY0X5b1gI/giphy.gif";

const base = cn("bg-transparent text-transparent");

const Image: FC<ImageProps> = ({ className, ...props }) => {
  const [imgState, setImgState] = useState<number>(0);

  const style = cn(base, imgState === 2 ? "hidden" : "visible", className);

  return (
    <>
      <img
        className={style}
        onLoad={() => setImgState(1)}
        onError={() => setImgState(2)}
        {...props}
      />

      <Empty show={imgState !== 2}>
        <ErrorImage />
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

interface ErrorImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

const errImageBase = cn(
  "h-3/6 max-w-3/4 object-cover rounded-lg",
  "opacity-75 invert-5 grayscale-100 group-hover:opacity-100",
  "dark:blur-xs dark:group-hover:blur-none",
  "dark:opacity-45 dark:invert-5 dark:grayscale-100 dark:group-hover:opacity-55 dark:group-hover:grayscale-50",
  "mask-radial-[100%_100%] mask-radial-from-40% mask-radial-at-left",
  "dark:mask-radial-[100%_100%] dark:mask-radial-from-10% dark:mask-radial-at-left",
  "duration-100 transition-all",
);

const ErrorImage: FC<ErrorImageProps> = ({
  src = FALLBACK_IMAGE_URL,
  className,
  ...props
}) => {
  const style = cn(errImageBase, className);
  return <img className={style} src={src} {...props} />;
};

export default Image;
