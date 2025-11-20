"use client";

import { Button } from "../button";
import { cn, ratios } from "../shared";

import Cropper from "react-easy-crop";
import ToolBar from "./tools/toolBar";
import { useFileStore } from "@/lib/store/useFileStore";

export default function PreviewItem({ id }: { id: string }) {
  const { file, edit, objectURL } = useFileStore((s) => s.files[id]);
  const setEdit = useFileStore((s) => s.setEdit);
  const orderIndex = useFileStore((s) => s.order.indexOf(id) + 1);

  if (!id || !file) return;

  console.log("render PreviewItem");

  function onCropChange(crop: { x: number; y: number }) {
    setEdit(id, { crop: { x: crop.x, y: crop.y } });
  }

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    console.log({ croppedArea, croppedAreaPixels });
  };

  const onZoomChange = (zoom: number) => {
    setEdit(id, { scale: zoom });
  };

  return (
    <>
      <div
        className={cn(
          "w-full aspect-square relative flex items-center justify-center",
          "overflow-hidden mt-4 bg-neutral-900/90 backdrop-blur-md rounded-xs",
        )}
      >
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-full overflow-hidden rounded-xs",
          )}
        >
          <Cropper
            classes={{
              mediaClassName: cn(
                "rounded-xs",
                edit.flip.horizontal ? "transform scale-x-[-1]" : "",
                // edit.flip.vertical ? "transform scale-y-[-1]" : "",
              ),
              cropAreaClassName:
                "!border-2 !border-transparent dark:hover:!border-blue-400 rounded-xs",
            }}
            maxZoom={10}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
            aspect={ratios[edit.ratio]}
            crop={edit.crop}
            image={objectURL}
            zoom={edit.scale}
            rotation={edit.rotation}
            showGrid={false}
          />
        </div>

        <div className="absolute left-3 bottom-2 opacity-0 sm:opacity-100">
          <Button
            size="sm"
            variant="outline"
            className="tabular-nums border-0 font-semibold text-xs"
            disabled
            title="Order index"
          >
            {orderIndex}
          </Button>
        </div>
        <div className="absolute top-1">
          <ToolBar id={id} />
        </div>
      </div>
    </>
  );
}
