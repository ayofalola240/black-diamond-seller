"use client";

import { EditorBubble, EditorCommand, EditorCommandEmpty, EditorCommandItem, EditorCommandList, EditorContent, EditorInstance, EditorRoot, JSONContent } from "novel";
import { useState } from "react";
import { NodeSelector } from "../editor/node-selector";
import { LinkSelector } from "../editor/link-selector";
import { TextButtons } from "../editor/text-buttons";
import { ColorSelector } from "../editor/color-selector";
import { defaultExtensions } from "../editor/extensions";
import { handleCommandNavigation, ImageResizer } from "novel/extensions";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { suggestionItems } from "../editor/slash-command";
import { uploadFn } from "../editor/image-upload";
import { useDebouncedCallback } from "use-debounce";
import { Controller, useFormContext } from "react-hook-form";

const extensions = [...defaultExtensions];

export const Editor = ({ name }: { name: string }) => {
  const { control, setValue } = useFormContext();
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);

  const debouncedUpdates = useDebouncedCallback(async (editor: EditorInstance) => {
    if (!editor) return;
    const json = editor.getJSON();
    setValue(name, JSON.stringify(json));
  }, 500);

  return (
    <EditorRoot>
      <Controller
        name={name}
        control={control}
        render={({ field: { value } }) => {
          return (
            <EditorContent
              className="text-sm overflow-hidden text-white h-[300px] border border-input font-normal rounded-[4px] "
              editorProps={{
                handleDOMEvents: {
                  keydown: (_view, event) => handleCommandNavigation(event),
                },
                handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
                handleDrop: (view, event, _slice, moved) => handleImageDrop(view, event, moved, uploadFn),
                attributes: {
                  class: "prose text-white  prose-lg prose-headings:font-title font-default focus:outline-none max-w-full",
                },
              }}
              extensions={extensions}
              initialContent={value ? (JSON.parse(value) as JSONContent) : undefined}
              onUpdate={({ editor }) => {
                debouncedUpdates(editor);
              }}
              slotAfter={<ImageResizer />}
            >
              <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
                <EditorCommandEmpty className="px-2 text-muted-foreground">No results</EditorCommandEmpty>
                <EditorCommandList>
                  {suggestionItems.map((item) => {
                    return (
                      <EditorCommandItem
                        value={item.title}
                        onCommand={(val) => item.command?.(val)}
                        className="flex w-full cursor-pointer items-center space-x-2 rounded-md px-2 py-1 text-left text-sm group hover:bg-accent aria-selected:bg-accent"
                        key={item.title}
                      >
                        <div className="flex h-10 w-10  items-center justify-center rounded-md border border-muted bg-background">{item.icon}</div>
                        <div>
                          <p className="font-medium group-aria-selected:text-white">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </EditorCommandItem>
                    );
                  })}
                </EditorCommandList>
              </EditorCommand>
              <EditorBubble
                tippyOptions={{
                  placement: "top",
                }}
                className="flex w-fit items-center h-auto max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl"
              >
                <NodeSelector open={openNode} onOpenChange={setOpenNode} />
                <LinkSelector open={openLink} onOpenChange={setOpenLink} />
                <TextButtons />
                <ColorSelector open={openColor} onOpenChange={setOpenColor} />
              </EditorBubble>
            </EditorContent>
          );
        }}
      />
    </EditorRoot>
  );
};
