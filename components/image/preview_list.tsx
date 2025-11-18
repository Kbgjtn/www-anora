"use client";

import { cn } from "../shared";
import { useFileStore } from "../upload/store";

import Image from "../image";
import PreviewItem from "./preview_item_v2";

export default function PreviewList() {
  const files = useFileStore((s) => s.files);
  const fileIds = Object.keys(files);
  const order = useFileStore((s) => s.order);
  const selectedId = useFileStore((s) => s.selectedId);

  if (fileIds.length === 0) return;

  console.log("render PreviewList");

  const previewId = selectedId ?? fileIds[0];

  return (
    <div className={cn("px-4 flex flex-col items-center gap-8")}>
      <PreviewItem key={previewId} id={previewId} />

      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-4">
        {order.map((id) => (
          <ImageThumbs key={id} id={id} />
        ))}
      </div>
    </div>
  );
}

const ImageThumbs = ({ id }: { id: string }) => {
  const file = useFileStore((s) => s.files[id]);
  const selectedId = useFileStore((s) => s.selectedId);
  const setSelected = useFileStore((s) => s.setSelected);
  const removeFile = useFileStore((s) => s.removeFile);

  if (!file) return null;

  const isSelected = id === selectedId;
  console.log("render image thumb");

  return (
    <div className="group relative">
      <button
        className={cn(
          "cursor-pointer rounded-md w-full",
          "focus:outline-neutral-600 focus:outline-2 focus:outline-offset-2",
          "overflow-hidden transition-none delay-0 duration-0",
          isSelected ? "ring-2 ring-blue-400" : "",
        )}
        onClick={() => setSelected(id)}
      >
        <Image
          className={cn("h-14 w-full object-cover")}
          draggable={false}
          src={file.objectURL}
          alt={id}
        />
      </button>

      <button
        type="button"
        onClick={() => removeFile(id)}
        tabIndex={-1}
        title={`Remove ${file.file.name}`}
        className={cn(
          "absolute opacity-0 group-hover:opacity-100",
          "backdrop-blur-sm cursor-pointer",
          "bottom-0 -right-2",
          "text-xs",
          "dark:bg-black/25 rounded-md px-1 py-0.5 transition-discrete ease-out",
          "dark:hover:bg-white/10 delay-150",
        )}
      >
        ―
      </button>
    </div>
  );
};
