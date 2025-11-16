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
import { useObjectContext } from "./context";
import { Poster, usePosterContext } from "../post/context";
import { randomFloat, randomInt } from "@/lib/rand/utility";

import ImagePreview from "./preview";
import Image from "../image";

interface UploadFormProps extends FormHTMLAttributes<HTMLFormElement> {}

const DEFAULT_CONTENT =
  "Aut dolor voluptas omnis nam et inventore error. Necessitatibus maiores qui qui et pariatur dolorem minima numquam. Voluptas eum et eligendi praesentium impedit commodi. Nulla enim ipsum natus odit sunt consequatur quae rem.";

const UploadForm: FC<UploadFormProps> = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState<string>(DEFAULT_CONTENT);

  const {
    reset,
    objects,
    push: pushObject,
    get,
    selectedIndex,
    setSelectedIndex,
  } = useObjectContext();

  const poster = usePosterContext();

  const openInputFile = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files;
    if (!fileList) return;
    if (fileList.length < 1) return;
    Array.from(fileList).forEach((file) => pushObject(file));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const p: Poster = {
      id: Date.now().toString(),
      objects: objects,
      content: formData.get("content") as string,
      analytics: {
        like: randomInt(100),
        comment: randomInt(100),
        engagement: randomFloat(0, 1000),
      },
      createdAt: Date.now(),
    };

    poster.push(p);
    handleFormReset(e);
  };

  const handleFormReset = (e: FormEvent<HTMLFormElement>) => {
    e.currentTarget.reset();
    reset();
    setContent("");
  };

  return (
    <div className="border border-dashed bg-neutral-900/20 border-neutral-900 hover:border-neutral-800/80 rounded-lg p-2 overflow-hidden">
      <form
        onReset={handleFormReset}
        onSubmit={handleSubmit}
        className="space-y-2"
      >
        {/* TODO: CSRF impl */}

        <div
          className={cn(
            "p-4 space-y-2 select-none",
            objects.length < 1 ? "hidden" : "visible",
          )}
        >
          {objects && objects.length > 0 && (
            <ImagePreview imageId={selectedIndex}>
              <img
                src={URL.createObjectURL(get(selectedIndex).f)}
                alt={get(selectedIndex).f.name}
                title={`${get(selectedIndex).f.name} - ${get(selectedIndex).f.size} bytes`}
                className="transform-none duration-initial"
              />
            </ImagePreview>
          )}

          <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(56px,1fr))] gap-4">
            {objects.map((object, i) => {
              return (
                <button
                  draggable
                  className="cursor-pointer appearance-none focus:rounded focus:outline-neutral-600 focus:outline-1"
                  // onDragStart={() => handleDragStart(index)}
                  // onDrop={() => handleDrop(index)}
                  // onDragOver={handleDragOver}
                  onClick={() => setSelectedIndex(i)}
                  type="button"
                  key={object.f.size}
                >
                  <div>
                    <Image
                      src={URL.createObjectURL(object.f)}
                      alt={object.f.name}
                      className={cn(
                        "h-14 w-full object-cover rounded",
                        i === selectedIndex ? "ring-2 ring-blue-400" : "",
                      )}
                      title={`${object.f.name} - ${object.f.size} bytes`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

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

        <input
          hidden
          multiple
          accept="image/*"
          type="file"
          ref={fileInputRef}
          onChange={handleInputFileChange}
        />

        <div className="px-2">
          {/* Tools  */}

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
              <Button
                disabled={!content}
                type="reset"
                size="sm"
                variant="secondary"
                className="max-sm:hidden"
              >
                Cancel
              </Button>

              <Button
                disabled={!content && !objects?.length}
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
      </form>
    </div>
  );
};

export default UploadForm;
