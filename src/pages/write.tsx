import { useState } from "react";
import type { NextPage } from "next";
import { EditorBox } from "../components";

const Write: NextPage = () => {
  const [content, useContent] = useState("");
  const onClick = () => {
    console.log(content);
  };

  return (
    <>
      <EditorBox height="600px" theme="dark" getEditorContent={useContent} />
    </>
  );
};

export default Write;
