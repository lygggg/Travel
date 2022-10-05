import { useState } from "react";
import { Button, Input } from "src/components/commons";
import { EditorBox, UploadModal } from "../index";

const EditorContainer = () => {
  const [content, setContent] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleModalOpen = async () => {
    setOpen((isOpen) => !isOpen);
  };

  return (
    <>
      {isOpen && (
        <UploadModal
          content={content}
          tag={tag}
          title={title}
          handleModalOpen={handleModalOpen}
        />
      )}
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
      <Button width="100px" height="40px" onClick={handleModalOpen}>
        버튼
      </Button>
    </>
  );
};

export default EditorContainer;
