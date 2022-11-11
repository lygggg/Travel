import { useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { Button, Input } from "src/components/commons";
import { EditorBox, UploadModal, InputTag } from "../index";
import useModal from "src/hooks/useModal";
import { articleState } from "src/store/article";

const EditorContainer = () => {
  const [ArticleState, setArticle] = useRecoilState(articleState);
  const { title } = ArticleState;
  const [openModal, closeModal, modalOpen] = useModal();
  const {
    query: { id },
  } = useRouter();

  // 모달 오픈
  const handleModalOpen = () => openModal();

  return (
    <>
      <UploadModal isActive={modalOpen} handleClose={closeModal} />
      <InputContainer>
        <Input
          type="text"
          placeholder="제목을 입력해주세요"
          variant="default"
          rounded="default"
          fontSize="large"
          aria-label="editor-title-input"
          value={title}
          onChange={(e) =>
            setArticle({ ...ArticleState, title: e.target.value })
          }
        />
        <InputTag onChange={(tags) => setArticle({ ...ArticleState, tags })} />
      </InputContainer>
      <EditorBox
        height="600px"
        theme="dark"
        onChange={(content) => setArticle({ ...ArticleState, content })}
      />
      <ButtonContainer>
        <Link href={"/"}>
          <Button variant="primary" size="large" rounded="round">
            나가기
          </Button>
        </Link>
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
