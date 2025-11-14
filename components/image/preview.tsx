"use client";

import { FC, HTMLAttributes, ReactNode, useState } from "react";

import { Toggle } from "../toggle";
import { cn } from "../shared";
import { Icon } from "../icons";

import AspectRatio from "../aspect_ratio";

type SupportedRatioType = "1:1" | "2:1" | "3:2" | "4:3" | "16:9";

interface ImagePreviewProps extends HTMLAttributes<HTMLElement> {
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
  ...props
}) => {
  const [ratio, setRatio] = useState<number>(ratios["1:1"]);

  const handleRatioToggle = (value: number) => {
    setRatio(value);
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <p className="self-start font-semibold">Select Ratio Image</p>
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(75px,1fr))] gap-4 self-start">
        {supportedRatio && supportedRatio.length > 0
          ? supportedRatio?.map((r, i) => (
              <Toggle
                key={i}
                value={ratios[r]}
                onClick={() => handleRatioToggle(ratios[r])}
                size="sm"
                toggleAccent="blue"
                className="px-2"
                selected={ratio === ratios[r]}
              >
                <Icon name="circle" size={10} className="inline-block" />
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
        <AspectRatio ratio={ratio}>{children}</AspectRatio>
      </div>
    </div>
  );
};

export default ImagePreview;
