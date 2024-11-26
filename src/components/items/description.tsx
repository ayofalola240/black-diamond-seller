"use client";

import { EditorContent, EditorRoot } from "novel";
import { defaultExtensions } from "../editor/extensions";

interface IProps {
  description: string;
}

export const Description = ({ description }: IProps) => {
  return (
    <EditorRoot>
      <EditorContent
        editable={false}
        extensions={[...defaultExtensions]}
        className="text-white"
        initialContent={Boolean(JSON?.parse(description)) ? JSON.parse(description) : undefined}
        editorProps={{
          attributes: {
            class: "prose prose-lg prose-invert dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
          },
        }}
      />
    </EditorRoot>
  );
};
