import { useState } from "react";
import { postArticle } from "../../../api/article";
import { Button, Input } from "../../UI/atoms";
import { EditorBox } from "../../UI/molecules";

const Editor = () => {
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");

  const createArticle = async () => {
    await postArticle({ content, tag, title });
  };

  return (
    <>
      <Input
        width="100px"
        height="100px"
        placeholder="제목을 입력해주세요"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        width="100px"
        height="100px"
        placeholder="태그를 입력해주세요"
        onChange={(e) => setTag(e.target.value)}
      />
      <EditorBox height="600px" theme="dark" onChange={setContent} />
      <Button
        width="100px"
        height="40px"
        children={"버튼"}
        onClick={createArticle}
      />
    </>
  );
};

export default Editor;
