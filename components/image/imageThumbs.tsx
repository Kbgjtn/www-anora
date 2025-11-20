import { FC, HTMLAttributes, memo } from "react";
import { cn } from "../shared";
import Image from "../image";
import { useFileStore } from "@/lib/store/useFileStore";

interface ImageThumsProps extends HTMLAttributes<HTMLElement> {
  id: string;
}

const ImageThumbs: FC<HTMLAttributes<HTMLElement> & { id: string }> = ({
  id,
  ...props
}: ImageThumsProps) => {
  const file = useFileStore((s) => s.files[id]);
  const selectedId = useFileStore((s) => s.selectedId);
  const setSelected = useFileStore((s) => s.setSelected);
  const removeFile = useFileStore((s) => s.removeFile);

  if (!file) return null;

  const isSelected = id === selectedId;

  console.log("render image thumb");

  return (
    <div className="group relative" draggable="true" {...props}>
      <button
        className={cn(
          "cursor-pointer rounded-md w-full",
          "focus:outline-none focus:ring-neutral-500 focus:ring-2",
          "overflow-hidden transition-none delay-0 duration-0",
          isSelected ? "ring-2 ring-blue-400" : "",
        )}
        draggable="false"
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
          "-top-1 -right-2",
          "text-[10px]",
          "dark:bg-black/20 rounded-md px-1 py-0.5 transition-discrete ease-out",
          "dark:hover:bg-white/10 delay-150",
        )}
      >
        ―
      </button>
    </div>
  );
};

export default memo(ImageThumbs);
