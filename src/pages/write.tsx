import type { NextPage } from "next";
import { EditorContainer } from "src/components/editor";

const Write: NextPage & { needAuth?: boolean } = () => {
  return (
    <>
      <EditorContainer />
    </>
  );
};

Write.needAuth = true;
export default Write;
