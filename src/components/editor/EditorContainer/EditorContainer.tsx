import { useState } from "react";
import styled from "@emotion/styled";
import { Button, Input } from "src/components/commons";
import { EditorBox, UploadModal, InputTag } from "../index";

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
      <InputContainer>
        <Input
          type="text"
          placeholder="제목을 입력해주세요"
          height="66px"
          fontColor="white"
          fontSize="2.75rem"
          fontWeight="bold"
          inputColor="#222"
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputTag />
      </InputContainer>
      <EditorBox height="600px" theme="dark" onChange={setContent} />
      <ButtonContainer>
        <Button
          width="120px"
          height="50px"
          buttonColor="black"
          fontColor="white"
        >
          나가기
        </Button>
        <ButtonLayout>
          <Button
            width="120px"
            height="50px"
            buttonColor="black"
            fontColor="white"
          >
            임시 저장
          </Button>
          <Button
            width="120px"
            height="50px"
            buttonColor="rgba(0, 0, 0, 0.2)"
            fontColor="white"
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
`;

const ButtonContainer = styled.div`
  display: flex;
  place-content: space-between;
  margin-bottom: 2rem;
`;

const ButtonLayout = styled.span`
  display: flex;
  gap: 10px;
`;
export default EditorContainer;
