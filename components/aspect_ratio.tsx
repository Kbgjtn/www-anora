"use client";

import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "./shared";

interface AspectRatioProps extends HTMLAttributes<HTMLElement> {
  ratio: number;
  maxHeight?: number;
  children: ReactNode;
}

const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio,
  maxHeight,
  children,
  className,
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hasReachedMaxSize, setHasReachedMaxSize] = useState<boolean>(false);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const wrapperHeight = wrapperRef.current.offsetHeight;
    if (maxHeight && wrapperHeight >= maxHeight) {
      setHasReachedMaxSize(true);
      return;
    }

    setHasReachedMaxSize(false);
  }, [maxHeight]);

  // Calculate maximum dimensions while maintaining the aspect ratio
  let calculatedMaxHeight = maxHeight;
  let calculatedMaxWidth;

  if (maxHeight) {
    calculatedMaxWidth = maxHeight * ratio;
  }

  const aspectStyle = {
    paddingTop: `${(1 / ratio) * 100}%`,
    maxHeight: calculatedMaxHeight,
    maxWidth: calculatedMaxWidth,
  } as React.CSSProperties;

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={aspectStyle}
      {...props}
    >
      {/* content-wrapper */}
      <div
        className={cn(
          "flex items-center justify-center overflow-hidden",
          "absolute top-0 left-0 w-full h-full",
          "*:min-w-full *:min-h-full *:object-cover *:max-w-full *:max-h-full",
          hasReachedMaxSize ? "object-contain" : "",
        )}
        ref={wrapperRef}
      >
        {children}
      </div>
    </div>
  );
};
export default AspectRatio;
