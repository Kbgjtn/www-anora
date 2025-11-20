import { memo } from "react";
import { Icon } from "@/components/icons";
import { Button } from "@/components/button";
import { useFileStore } from "@/lib/store/useFileStore";
import { DropdownMenu } from "@/components/dropdown/dropDownMenu";
import { cn, ratiosIds, SupportedRatioType } from "@/components/shared";
import { DropdownMenuItem } from "@/components/dropdown/dropdownMenuItem";
import { DropdownMenuTrigger } from "@/components/dropdown/dropdownMenuTrigger";
import { DropdownMenuContent } from "@/components/dropdown/dropdownMenuContent";

const ToolBar = ({ id }: { id: string }) => {
  type ToolComponent = React.ComponentType<{ id: string }>;

  const tools: { name: string; comp: ToolComponent }[] = [
    { name: "aspect_ratio", comp: AspectRatioDropDown },
    { name: "pan_zoom", comp: ScaleDropDown },
    { name: "flip", comp: FlipToggle },
    { name: "rotate_90_cw", comp: Rotate90DegreesCwToggle },
    { name: "reset_edit", comp: ResetButtonToggle },
  ];

  return (
    <div
      className={cn(
        "flex py-1 px-4 gap-3 dark:bg-neutral-900/90 backdrop-blur-md dark:border-neutral-900 border rounded-xl justify-center",
      )}
    >
      {tools.map((t) => {
        return (
          <div key={t.name} className="shrink-0 h-6 w-6">
            <t.comp id={id} />
          </div>
        );
      })}
    </div>
  );
};

const ScaleDropDown = ({ id }: { id: string }) => {
  const scale = useFileStore((s) => s.files[id].edit.scale);

  const updateEdit = useFileStore((s) => s.setEdit);

  return (
    <div className="h-4 w-4">
      <DropdownMenu>
        <DropdownMenuTrigger title="Adjust scaling">
          <Button variant="outline" className="border-none" size="fl">
            <Icon size={16} name={"pan_zoom"} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className={cn(
            "fixed -translate-x-1/4 z-10 mt-2 rounded-xl dark:bg-neutral-900/95 backdrop-blur-md ring-1 ring-neutral-900 ring-opacity-5 focus:outline-none",
          )}
        >
          <DropdownMenuItem
            className={cn("px-3.5 py-1.5 font-medium text-xs cursor-pointer")}
            onClick={() => {}}
          >
            <input
              type="range"
              title={`scale: ${scale}`}
              min={1}
              max={10}
              step={0.001}
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
      className="border-0"
      variant="outline"
      size="fl"
      title="Restore default"
      type="button"
      onClick={() => resetEdit(id)}
    >
      <Icon name="restart_alt" size={16} />
    </Button>
  );
};

const Rotate90DegreesCwToggle = ({ id }: { id: string }) => {
  const { rotation } = useFileStore((s) => s.files[id].edit);
  const setEdit = useFileStore((s) => s.setEdit);

  return (
    <Button
      className="border-0"
      variant="outline"
      size="fl"
      title="Rotate right"
      type="button"
      onClick={() => setEdit(id, { rotation: (rotation - 90 + 360) % 360 })}
    >
      <Icon name="rotate_90_degrees_cw" size={16} />
    </Button>
  );
};

const FlipToggle = ({ id }: { id: string }) => {
  const { flip } = useFileStore((s) => s.files[id].edit);
  const setEdit = useFileStore((s) => s.setEdit);
  const { horizontal, vertical } = flip;

  return (
    <Button
      className="border-none"
      variant="outline"
      size="fl"
      title="Flip horizontal"
      type="button"
      onClick={() =>
        setEdit(id, { flip: { horizontal: !horizontal, vertical: vertical } })
      }
    >
      <Icon size={16} name="flip" />
    </Button>
  );
};

const AspectRatioDropDown = ({ id }: { id: string }) => {
  const ratio = useFileStore((s) => s.files[id].edit.ratio);
  const updateEdit = useFileStore((s) => s.setEdit);

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger title="Select aspect ratio">
          <Button variant="outline" className="border-none" size="fl">
            <Icon size={16} name={"aspect_ratio"} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn(
            "fixed -translate-x-1/4 z-10 mt-2 w-24 p-1 rounded-xl dark:bg-neutral-900/95 backdrop-blur-md ring-1 ring-neutral-900 ring-opacity-5 focus:outline-none",
          )}
        >
          {ratiosIds.map((rid) => {
            return (
              <DropdownMenuItem
                key={rid}
                className={cn(
                  "select-none capitalize tabular-nums rounded-lg py-1 mb-0.5 px-4 text-xs hover:bg-neutral-800 cursor-pointer",
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

export default memo(ToolBar);
