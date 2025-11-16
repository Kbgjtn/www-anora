"use client";

import { HTMLAttributes, FC } from "react";
import { Poster } from "./context";
import { timeSince } from "@/lib/time/utility";
import { cn } from "../shared";
import { Button } from "../button";
import { Icon } from "../icons";

import Image from "../image";
import AspectRatio from "../aspect_ratio";

interface PosterCardProps extends HTMLAttributes<HTMLElement> {
  poster: Poster;
}

const PosterCard: FC<PosterCardProps> = ({ poster, ...props }) => {
  return (
    <div
      className="flex flex-col gap-4 items-start justify-center bg-[#101010] mb-1 rounded-lg border-neutral-700 p-4"
      {...props}
    >
      {poster && (
        <>
          {/* Header */}
          <div className="flex justify-between w-full text-xs">
            <div className="inline-flex items-center rounded gap-2">
              <a href="/kbgjtn">
                <img
                  src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExajZ3dzFqN25nZTJubTRwcHoyaHY4cWN1Y3V2MnhmZ2RkZ2Zpa3dpOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iWtJ5W7knDY0X5b1gI/giphy.gif"
                  className="inline-block size-8 object-cover rounded-full ring-2 ring-neutral-900 outline -outline-offset-1 outline-white/10 grayscale-100"
                />
              </a>

              <div className="inline-flex flex-col self-start">
                <a href="/kbgjtn">
                  <b className="text-xs align-top">Kbgjtn</b>
                </a>
                <time className="opacity-25 text-xs/tight">
                  {timeSince(poster.createdAt)}
                </time>
              </div>
            </div>

            <Button size="sm" variant="outline" className="h-max">
              ⋮
            </Button>
          </div>

          <div className="flex gap-1 snap-x w-full overflow-x-auto rounded-lg">
            {/* Objects */}
            {poster.objects?.map((object, i) => (
              <div
                key={i}
                className="snap-start snap-normal scroll-ml-0 inline-flex max-w-prose min-w-full items-center"
              >
                <AspectRatio ratio={object.meta?.ratio || 16 / 9}>
                  <Image
                    src={URL.createObjectURL(object.f)}
                    className={cn(
                      poster.objects?.length ? "w-full" : "max-w-sm",
                      "rounded",
                    )}
                    alt={object.f.name}
                  />
                </AspectRatio>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="text-current/75 whitespace-pre-wrap text-xs">
            {poster.content}
          </div>

          {/* Interactions */}
          <div className="flex gap-4 pt-2 mb-1 text-xs justify-between w-full border-t border-neutral-700 opacity-50">
            <Button
              size="sm"
              variant="secondary"
              className="space-x-0.5 dark:bg-transparent"
            >
              <Icon name="favorite" className="inline-block" size={18} />
            </Button>

            <Button
              size="sm"
              variant="secondary"
              className="space-x-0.5 dark:bg-transparent"
            >
              <Icon
                name="comment"
                className="inline-block stroke-current"
                size={18}
              />
            </Button>

            <Button
              size="sm"
              variant="secondary"
              className="space-x-0.5 dark:bg-transparent"
            >
              <Icon
                name="bookmark"
                className="inline-block rounded-lg"
                size={18}
              />
            </Button>

            <Button
              size="sm"
              variant="secondary"
              className="space-x-1 dark:bg-transparent"
            >
              <Icon name="sensors" className="inline-block" size={18} />
              <span className="text-xs tabular-nums align-middle">
                {poster.analytics.engagement.toFixed(1) + "k"}
              </span>
            </Button>
          </div>

          <div className="flex -space-x-1">
            <img
              src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExajZ3dzFqN25nZTJubTRwcHoyaHY4cWN1Y3V2MnhmZ2RkZ2Zpa3dpOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iWtJ5W7knDY0X5b1gI/giphy.gif"
              className="inline-block h-4 w-4 rounded-full ring ring-white/5 grayscale-100"
            />
            <img
              src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExajZ3dzFqN25nZTJubTRwcHoyaHY4cWN1Y3V2MnhmZ2RkZ2Zpa3dpOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iWtJ5W7knDY0X5b1gI/giphy.gif"
              className="inline-block h-4 w-4 rounded-full ring ring-white/5 grayscale-100"
            />
            <img
              src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExajZ3dzFqN25nZTJubTRwcHoyaHY4cWN1Y3V2MnhmZ2RkZ2Zpa3dpOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iWtJ5W7knDY0X5b1gI/giphy.gif"
              className="inline-block h-4 w-4 rounded-full ring ring-white/5 grayscale-100"
            />

            <div className="inline-flex opacity-25 gap-4">
              <span className="inline-block text-xs ml-4 tabular-nums">
                {poster.analytics.like} likes
              </span>
              <span className="inline-block text-xs">·</span>
              <span className="inline-block text-xs">
                {poster.analytics.comment} comments
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PosterCard;
