"use client";

import {
  ChangeEvent,
  FC,
  FormEvent,
  FormHTMLAttributes,
  useState,
} from "react";
import { Textarea } from "../textarea";
import { Button } from "../button";
import { Icon } from "../icons";
import { Label } from "../label";

import UploadForm from "../image/form";
import { useFileStore } from "@/lib/store/useFileStore";

interface PostFormProps extends FormHTMLAttributes<HTMLFormElement> {}

const DEFAULT_CONTENT =
  "Aut dolor voluptas omnis nam et inventore error. Necessitatibus maiores qui qui et pariatur dolorem minima numquam. Voluptas eum et eligendi praesentium impedit commodi. Nulla enim ipsum natus odit sunt consequatur quae rem.";

const PostForm: FC<PostFormProps> = () => {
  const [content, setContent] = useState<string>(DEFAULT_CONTENT);
  const resetFileStore = useFileStore((s) => s.reset);
  const fileLength = useFileStore((s) => Object.keys(s.files).length);

  console.log(`PostForm render`);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  // TODO handle post form reset

  // TODO handle upload form reset

  function handleReset(e: FormEvent<HTMLFormElement>) {
    confirm("are you sure? your previous data will be lost!");
    e.currentTarget.reset();
    setContent("");
    resetFileStore();
  }

  return (
    <div>
      <UploadForm />

      <form onReset={handleReset} className="space-y-3">
        <Textarea
          autoGrow
          id="content"
          name="content"
          rows={3}
          spellCheck
          autoCorrect="on"
          autoComplete="language"
          value={content}
          onChange={handleContentChange}
          placeholder="Give a shotout! Share your point of view!"
          className="border-none focus:border-none focus:outline-none dark:bg-neutral-900/30 rounded-lg"
        />

        <BarSection
          disabled={{
            post: true,
            cancel: content.length > 0 || fileLength > 0,
          }}
        />
      </form>
    </div>
  );
};

interface BarSectionProps {
  disabled: {
    post: boolean;
    cancel: boolean;
  };
}

const BarSection: FC<BarSectionProps> = ({ disabled }) => {
  return (
    <div className="border-dashed px-2">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Label htmlFor="files" size="fl">
            <Icon name="attachment" size={16} />
          </Label>
          <Label size="fl">
            <Icon name="gif" size={16} />
          </Label>
        </div>
        <div className="flex gap-2">
          {disabled.cancel && (
            <Button type="reset" variant="secondary" size="sm" title="cancel">
              Cancel
            </Button>
          )}

          <Button
            type="submit"
            size="sm"
            title="Submit"
            disabled={disabled.post}
            className={"sm:px-4"}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
