import { useToast } from "../toast";
import { ChangeEvent, FC, HTMLAttributes } from "react";
import { useFileStore } from "@/lib/store/useFileStore";

import PreviewList from "./previewList";

const DEFAULT_ACCEPT_FILE = "image/*";
const DEFAULT_MAX_FILE_ITEMS = 10;

interface UploadFormProps extends HTMLAttributes<HTMLElement> {}

const UploadForm: FC<UploadFormProps> = () => {
  const { toast } = useToast();
  const addFiles = useFileStore((s) => s.addFiles);
  const fileLength = useFileStore((s) => Object.keys(s.files).length);

  console.log(`UploadForm render`);

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files;
    console.log({ fileList });
    if (!fileList) return;
    if (fileList.length < 1) return;

    const reachedMax =
      fileLength + fileList.length > 10 ||
      fileList.length > DEFAULT_MAX_FILE_ITEMS;

    if (reachedMax) {
      toast({
        type: "error",
        timeout: 5000,
        title: "Upps, too many items!",
        description: "The maximun of media items is ten per poster!",
        icon: "report",
        reportTo: "/support",
      });
      return;
    }

    addFiles(Array.from(fileList));
  };

  // TODO handle request pre-signed URL PUT object

  // TODO handle upload to blob-storage

  return (
    <>
      {fileLength > 0 && <PreviewList />}

      <input
        hidden
        multiple
        type="file"
        id="files"
        tabIndex={-1}
        onChange={handleSelectFile}
        accept={DEFAULT_ACCEPT_FILE}
      />
    </>
  );
};

export default UploadForm;
