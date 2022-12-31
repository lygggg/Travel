import styled from "@emotion/styled";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { Button, Input } from "src/components/commons";
import { EditorBox, UploadModal, InputTag } from "../index";
import useModal from "src/hooks/useModal";
import { articleState } from "src/store/article";

const EditorContainer = () => {
  const [openModal, closeModal, modalOpen] = useModal();
  const [ArticleState, setArticle] = useRecoilState(articleState);
  const { title, tags, content } = ArticleState;

  // 모달 오픈
  const handleModalOpen = () => openModal();

  return (
    <>
      <UploadModal isActive={modalOpen} handleClose={closeModal} />
      <Container>
        <InputContainer>
          <Input
            type="text"
            placeholder="제목을 입력해주세요"
            variant="default"
            rounded="default"
            fontSize="large"
            aria-label="editor-title-input"
            data-testid="editor-title-input"
            value={title}
            onChange={(e) =>
              setArticle({ ...ArticleState, title: e.target.value })
            }
          />
          <InputTag
            tagList={tags}
            onChange={(tags) => setArticle({ ...ArticleState, tags })}
          />
        </InputContainer>
        <EditorBox
          height="600px"
          theme="dark"
          content={content}
          onChange={(content) => setArticle({ ...ArticleState, content })}
        />
        <ButtonContainer>
          <Link href={"/"}>
            <Button variant="primary" size="large" rounded={true}>
              나가기
            </Button>
          </Link>
          <ButtonLayout>
            <Button variant="primary" size="large" rounded={true}>
              임시 저장
            </Button>
            <Button
              variant="default"
              size="large"
              rounded={true}
              onClick={handleModalOpen}
              data-testid="write-button"
            >
              작성하기
            </Button>
          </ButtonLayout>
        </ButtonContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 1rem;
`;
const InputContainer = styled.div`
  display: flex;
  flex-flow: column;
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
