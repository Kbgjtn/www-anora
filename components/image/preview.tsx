"use client";

import { Toggle } from "../toggle";
import { useObjectContext } from "./context";
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
  const [ratio, setRatio] = useState<number>(ratios["1:1"]);
  const { updateRatio, getRatio } = useObjectContext();

  const handleRatioToggle = (value: number) => {
    setRatio(value);

    if (imageId !== undefined) {
      updateRatio(imageId, value);
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <p className="self-start font-semibold text-xs">Ratio</p>
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(48px,1fr))] gap-2 self-start">
        {supportedRatio && supportedRatio.length > 0
          ? supportedRatio?.map((r, i) => (
              <Toggle
                key={i}
                value={ratios[r]}
                onClick={() => handleRatioToggle(ratios[r])}
                size="sm"
                toggleAccent="blue"
                className="p-0"
                selected={
                  imageId !== undefined
                    ? getRatio(imageId) === ratios[r]
                    : ratio === ratios[r]
                }
              >
                {r}
              </Toggle>
            ))
          : null}
      </div>

      <div
        className={cn(
          "w-full max-h-[560px] min-h-[560px]",
          "flex items-center justify-center",
          "overflow-hidden rounded-md",
        )}
        {...props}
      >
        <AspectRatio
          maxHeight={maxHeight}
          ratio={imageId !== undefined ? getRatio(imageId) : ratio}
        >
          {children}
        </AspectRatio>
      </div>
    </div>
  );
};

export default ImagePreview;
