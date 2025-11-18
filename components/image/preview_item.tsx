"use client";

import { Icon } from "../icons";
import { Button } from "../button";
import { useFileStore } from "../upload/store";
import { cn, SupportedRatioType } from "../shared";
import { DropdownMenu } from "../dropdown/dropDownMenu";
import { DropdownMenuTrigger } from "../dropdown/dropdownMenuTrigger";
import { DropdownMenuContent } from "../dropdown/dropdownMenuContent";
import { DropdownMenuItem } from "../dropdown/dropdownMenuItem";

import AspectRatio from "../aspect_ratio";
import Image from "../image";

const ratios: Record<string, number> = {
  auto: 1,
  "1:1": 1 / 1,
  "2:1": 2 / 1,
  "3:2": 3 / 2,
  "4:3": 4 / 3,
  "16:9": 16 / 9,
};

export default function PreviewItem({ id }: { id: string }) {
  const { file, edit, objectURL } = useFileStore((s) => s.files[id]);
  // const updateEdit = useFileStore((s) => s.updateEdit);

  if (!id) return;

  console.log("render PreviewItem");

  const ratio = ratios[edit.ratio];

  return (
    <>
      <div
        className={cn(
          // "max-w-[560px] min-w-[560px]",
          "w-full aspect-3/2",
          "flex items-center justify-center",
          "overflow-hidden rounded",
        )}
      >
        <AspectRatio ratio={ratio}>
          <Image
            draggable={false}
            src={objectURL}
            className="select-none object-top-left"
            alt={file.name}
            style={{
              transform: `scale(${edit.scale}) translate(${edit.position.x}px, ${edit.position.y}px)`,
            }}
          />
        </AspectRatio>
      </div>

      <ToolsBar id={id} />
    </>
  );
}

const ToolsBar = ({ id }: { id: string }) => {
  const tools = [
    { name: "pan_zoom", comp: AspecRatioDropDown },
    { name: "aspect_ratio", comp: ScaleDropDown },
    { name: "reset_edit", comp: ResetButtonToggle },
  ];

  return (
    <div
      className={cn(
        "flex py-1 px-4 gap-3 min-h-10 bg-neutral-900 border-2 border-neutral-800 rounded-lg overflow-hidden justify-center",
      )}
    >
      {tools.map((t, i) => {
        return (
          <div key={i} className="shrink-0 h-8 w-8">
            <t.comp id={id} />
          </div>
        );
      })}
    </div>
  );
};

const ScaleDropDown = ({ id }: { id: string }) => {
  const scale = useFileStore((s) => s.files[id].edit.scale);

  const updateEdit = useFileStore((s) => s.updateEdit);

  return (
    <div className="h-8 w-8">
      <DropdownMenu>
        <DropdownMenuTrigger title="Adjust scaling">
          <Button
            variant="outline"
            className="bg-transparent border-none"
            size="fl"
          >
            <Icon className="inline-block fill-neutral-300" name={"pan_zoom"} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className={cn(
            "fixed -translate-x-1/2 z-10 mt-2 rounded-md dark:bg-neutral-900 shadow-lg ring-1 ring-neutral-700 ring-opacity-5 focus:outline-none",
          )}
        >
          <DropdownMenuItem
            className={cn("w-60 p-3 font-medium text-xs cursor-pointer")}
            onClick={() => {}}
          >
            <input
              type="range"
              title="image scaling"
              min={1}
              max={6}
              step={0.01}
              value={scale}
              onChange={(e) =>
                updateEdit(id, { scale: parseFloat(e.target.value) })
              }
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ResetButtonToggle = ({ id }: { id: string }) => {
  const resetEdit = useFileStore((s) => s.resetEdit);

  return (
    <Button
      className="border-0 p-0 bg-transparent"
      variant="outline"
      size="fl"
      title="Restore default"
      type="button"
      onClick={() => resetEdit(id)}
    >
      <Icon name="restart_alt" className="inline-block fill-neutral-300" />
    </Button>
  );
};

const AspecRatioDropDown = ({ id }: { id: string }) => {
  const ratiosIds = Object.keys(ratios);
  const ratio = useFileStore((s) => s.files[id].edit.ratio);
  const updateEdit = useFileStore((s) => s.updateEdit);

  return (
    <div className="relative h-8 w-8">
      <DropdownMenu>
        <DropdownMenuTrigger title="Select aspect ratio">
          <Button
            variant="outline"
            className="bg-transparent border-none"
            size="fl"
          >
            <Icon
              className="inline-block fill-neutral-300"
              name={"aspect_ratio"}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn(
            "fixed -translate-x-1/4 z-10 mt-2 w-24 p-1 rounded-md dark:bg-neutral-900 shadow-lg ring-1 ring-neutral-700 ring-opacity-5 focus:outline-none",
          )}
        >
          {ratiosIds.map((rid) => {
            return (
              <DropdownMenuItem
                key={rid}
                className={cn(
                  "select-none capitalize tabular-nums rounded-md py-1 mb-0.5 px-4 font-medium text-sm hover:bg-neutral-800 cursor-pointer",
                  rid === ratio ? "bg-neutral-800" : "",
                )}
                onClick={() =>
                  updateEdit(id, { ratio: rid as SupportedRatioType })
                }
              >
                {rid}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
