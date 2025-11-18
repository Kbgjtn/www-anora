"use client";

import {
  ChangeEvent,
  FC,
  FormEvent,
  FormHTMLAttributes,
  useRef,
  useState,
} from "react";
import { cn } from "../shared";
import { Icon } from "../icons";
import { Button } from "../button";
import { Textarea } from "../textarea";
import { useFileStore } from "../upload/store";

import PreviewList from "./preview_list";
interface UploadFormProps extends FormHTMLAttributes<HTMLFormElement> {}

const DEFAULT_CONTENT =
  "Aut dolor voluptas omnis nam et inventore error. Necessitatibus maiores qui qui et pariatur dolorem minima numquam. Voluptas eum et eligendi praesentium impedit commodi. Nulla enim ipsum natus odit sunt consequatur quae rem.";

const DEFAULT_ACCEPT_FILE = "image/*";

const UploadForm: FC<UploadFormProps> = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState<string>(DEFAULT_CONTENT);

  const addFiles = useFileStore((s) => s.addFiles);
  const reset = useFileStore((s) => s.reset);

  // const files = useFileStore((s) => s.files);
  // const fileIds = Object.keys(files);

  console.log(`UploadForm re-render`);

  const openInputFile = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files;
    if (!fileList) return;
    if (fileList.length < 1) return;
    addFiles(Array.from(fileList));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log({ payload: formData });

    handleFormReset(e);
  };

  const handleFormReset = (e: FormEvent<HTMLFormElement>) => {
    e.currentTarget.reset();
    reset();
    setContent("");
  };

  return (
    <div className="border border-dashed bg-neutral-900/20 border-neutral-900 hover:border-neutral-800/80 rounded-lg p-2 overflow-hidden">
      <PreviewList />

      <input
        hidden
        multiple
        type="file"
        tabIndex={-1}
        ref={fileInputRef}
        onChange={handleSelectFile}
        accept={DEFAULT_ACCEPT_FILE}
      />

      <form
        onReset={handleFormReset}
        onSubmit={handleSubmit}
        className="space-y-2"
      >
        <Textarea
          autoGrow
          id="content"
          name="content"
          rows={3}
          spellCheck
          autoCorrect="on"
          autoComplete="language"
          value={content}
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
          placeholder="Give a shotout! Share your point of view!"
          className="border-none focus:border-none focus:outline-none"
        />

        <OtherSection
          openInputFile={openInputFile}
          // disabledPost={!content && !fileIds.length}
          // showCancel={content.length > 0 || fileIds.length > 0}
          disabledPost={!content}
          showCancel={content.length > 0}
        />
      </form>
    </div>
  );
};

type OtherSectionProps = {
  openInputFile: () => void;
  showCancel: boolean;
  disabledPost: boolean;
};

function OtherSection({
  disabledPost,
  showCancel,
  openInputFile,
}: OtherSectionProps) {
  return (
    <div className="px-2">
      <div className="flex justify-between items-center">
        <div className="space-x-2 flex">
          <Button
            type="button"
            onClick={openInputFile}
            size="fl"
            variant="outline"
            title="Select file from computer"
            className="w-max h-max"
          >
            <Icon name="attachment" size={16} />
          </Button>
          <Button
            disabled
            title="select gif"
            type="button"
            size="fl"
            variant="outline"
            className="w-max h-max"
          >
            <Icon name="gif" size={16} />
          </Button>
        </div>

        <div className="flex space-x-2">
          {showCancel && (
            <Button type="reset" size="sm" variant="secondary">
              Cancel
            </Button>
          )}

          <Button
            disabled={disabledPost}
            type="submit"
            size="sm"
            variant="primary"
            className={cn("sm:px-4")}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UploadForm;
