import styled from "@emotion/styled";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { Button, Input } from "src/components/commons";
import { EditorBox, InputTag } from "../index";
import { articleState } from "src/store/article";
import { useModalActions } from "src/contexts/modalContext";
import { modals } from "src/components/commons/Modal/GlobalModal";

const EditorContainer = () => {
  const modalDispatch = useModalActions();
  const [ArticleState, setArticle] = useRecoilState(articleState);
  const { title, tags, content } = ArticleState;

  // 모달 오픈
  const handleModalOpen = () =>
    modalDispatch?.({ type: "open", component: modals.CREATE_ARTICLE_MODAL });

  return (
    <>
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
            <Button
              variant="primary"
              size="large"
              rounded={true}
              aria-label="글 작성하기에서 나가기"
            >
              나가기
            </Button>
          </Link>
          <ButtonLayout>
            <Button
              variant="default"
              size="large"
              rounded={true}
              onClick={handleModalOpen}
              data-testid="write-button"
              aria-label="글 작성 완료하기"
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
  padding: 25px;
`;
const InputContainer = styled.div`
  display: flex;
  flex-flow: column;
  margin-bottom: 20px;
  gap: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  place-content: space-between;
  margin-top: 15px;
`;

const ButtonLayout = styled.span`
  display: flex;
  gap: 10px;
`;

export default EditorContainer;
