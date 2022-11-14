import type { NextPage } from "next";
import { EditorContainer } from "src/components/editor";

const Write: NextPage & { auth?: boolean } = () => {
  return (
    <>
      <EditorContainer />
    </>
  );
};

Write.auth = true;
export default Write;
