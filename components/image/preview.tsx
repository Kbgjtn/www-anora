"use client";

import { Toggle } from "../toggle";
import { useObjectContext, useObjectRatio } from "./context";
import { cn, SupportedRatioType } from "../shared";
import { FC, HTMLAttributes, ReactNode, useState } from "react";

import AspectRatio from "../aspect_ratio";

interface ImagePreviewProps extends HTMLAttributes<HTMLElement> {
  imageId?: number;
  maxHeight?: number;
  supportedRatio?: SupportedRatioType[];
  children: ReactNode;
}

const defaultSupportedRatio: SupportedRatioType[] = [
  "1:1",
  "2:1",
  "3:2",
  "4:3",
  "16:9",
];

const ratios: Record<string, number> = {
  "1:1": 1 / 1,
  "2:1": 2 / 1,
  "3:2": 3 / 2,
  "4:3": 4 / 3,
  "16:9": 16 / 9,
};

const ImagePreview: FC<ImagePreviewProps> = ({
  supportedRatio = defaultSupportedRatio,
  children,
  className,
  maxHeight,
  imageId,
  ...props
}) => {
  const [localRatio, setLocalRatio] = useState(ratios["1:1"]);

  const { setRatio } = useObjectContext();
  const controlled = imageId !== undefined;
  const ctxRatio = useObjectRatio(imageId ?? 0);
  const effectiveRatio = controlled ? ctxRatio : localRatio;

  const handleRatioToggle = (value: number) => {
    if (controlled) {
      if (value === ctxRatio) return;
      setRatio(imageId!, value);
    } else {
      setLocalRatio(value);
    }
  };
  console.log("ImagePreview re-render", imageId);

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {supportedRatio?.length > 0 && (
        <>
          <p className="self-start font-semibold text-xs">Ratio</p>
          <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(48px,1fr))] gap-2 self-start">
            {supportedRatio?.map((r) => {
              const val = ratios[r];
              return (
                <Toggle
                  key={r}
                  size="sm"
                  value={val}
                  className="p-0"
                  toggleAccent="blue"
                  onClick={() => handleRatioToggle(val)}
                  selected={effectiveRatio === val}
                >
                  {r}
                </Toggle>
              );
            })}
          </div>
        </>
      )}

      <div
        className={cn(
          "w-full max-h-[560px] min-h-[560px]",
          "flex items-center justify-center",
          "overflow-hidden rounded",
        )}
        {...props}
      >
        <AspectRatio maxHeight={maxHeight} ratio={effectiveRatio || localRatio}>
          {children}
        </AspectRatio>
      </div>
    </div>
  );
};

export default ImagePreview;
