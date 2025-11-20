"use client";

import { cn } from "../shared";
import { DragEvent, useState } from "react";

import PreviewItem from "./previewItem";
import ImageThumbs from "./imageThumbs";
import { useFileStore } from "@/lib/store/useFileStore";

function PreviewList() {
  const files = useFileStore((s) => s.files);
  const fileIds = Object.keys(files);
  const order = useFileStore((s) => s.order);
  const selectedId = useFileStore((s) => s.selectedId);
  const setOrder = useFileStore((s) => s.setOrderByIndex);

  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  if (fileIds.length === 0) return;

  console.log("render PreviewList");

  const previewId = selectedId ?? fileIds[0];

  const handleDragStart = (id: string) => {
    setDraggedItem(order.indexOf(id));
  };

  const handleDrop = (id: string) => {
    if (draggedItem === null) return;
    setOrder(draggedItem, order.indexOf(id));
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className={cn("px-4 flex flex-col items-center gap-8")}>
      <PreviewItem key={previewId} id={previewId} />

      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-4">
        {order.map((id) => (
          <ImageThumbs
            onDragStart={() => handleDragStart(id)}
            onDrop={() => handleDrop(id)}
            onDragOver={handleDragOver}
            key={id}
            id={id}
          />
        ))}
      </div>
    </div>
  );
}

export default PreviewList;
