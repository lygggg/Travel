import { useRef } from "react";
import type { NextPage } from "next";
import { EditorBox } from "../components";
import { Editor } from "@toast-ui/react-editor";

const Write: NextPage = () => {
  const editorRef = useRef<Editor>(null);
  const onChange = () => {
    if (!editorRef.current) return;
    const data = editorRef.current.getInstance().getMarkdown();
    if (data) console.log(data);
  };

  return (
    <>
      <EditorBox
        height="600px"
        theme="dark"
        onChange={onChange}
        editorRef={editorRef}
      />
    </>
  );
};

export default Write;
