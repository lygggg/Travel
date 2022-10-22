import { useState } from "react";
import styled from "@emotion/styled";
import { Button, Input } from "src/components/commons";
import { EditorBox, UploadModal, InputTag } from "../index";

const EditorContainer = () => {
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleModalOpen = async () => {
    if (!tags) {
      alert("태그를 작성해주세요");
      return;
    }
    if (!content) {
      alert("본문을 작성해주세요");
      return;
    }
    if (!title) {
      alert("제목을 작성해주세요");
      return;
    }
    setOpen((isOpen) => !isOpen);
  };

  return (
    <>
      {isOpen && (
        <UploadModal
          content={content}
          tags={tags}
          title={title}
          handleModalOpen={handleModalOpen}
        />
      )}
      <InputContainer>
        <Input
          type="text"
          placeholder="제목을 입력해주세요"
          variant="default"
          rounded="default"
          fontSize="large"
          aria-label="editor-title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputTag onChange={setTags} />
      </InputContainer>
      <EditorBox height="600px" theme="dark" onChange={setContent} />
      <ButtonContainer>
        <Button variant="primary" size="large" rounded="round">
          나가기
        </Button>
        <ButtonLayout>
          <Button variant="primary" size="large" rounded="round">
            임시 저장
          </Button>
          <Button
            variant="default"
            size="large"
            rounded="round"
            onClick={handleModalOpen}
          >
            작성하기
          </Button>
        </ButtonLayout>
      </ButtonContainer>
    </>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 3rem;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  place-content: space-between;
  margin-top: 2rem;
`;

const ButtonLayout = styled.span`
  display: flex;
  gap: 10px;
`;
export default EditorContainer;
