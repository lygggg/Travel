import { useRef } from "react";
import type { NextPage } from "next";
import { Editor } from "../components";

const Write: NextPage = () => {
  const editorRef = useRef(null);
  const onChange = () => {
    const data = editorRef.current.getInstance().getMarkdown();
    console.log(data);
    // return data;
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
