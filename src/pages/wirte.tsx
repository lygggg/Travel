import { useRef } from "react";
import type { NextPage } from "next";
import { Editor } from "../components";

const Write: NextPage = () => {
  const editorRef = useRef(null);
  const onChange = () => {
    if (!editorRef.current) return;
    const data = editorRef.current.getInstance().getMarkdown();
    if (data) console.log(data);
  };

  return (
    <>
      <Editor
        height="600px"
        theme="dark"
        onChange={onChange}
        editorRef={editorRef}
      />
    </>
  );
};

export default Write;
