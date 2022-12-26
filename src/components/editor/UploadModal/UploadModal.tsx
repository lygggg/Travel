import styled from "@emotion/styled";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useRecoilState, useResetRecoilState } from "recoil";
import { usePostArticle } from "src/hooks/api/useArticle";
import { Button, Modal, TextArea } from "src/components/commons";
import { articleState } from "src/store/article";
import { ImageUpload } from "../index";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export interface Props {
  isActive: boolean;
  handleClose: () => void;
}

const UploadModal: React.FC<Props> = ({ isActive, handleClose }) => {
  const resetArticle = useResetRecoilState(articleState);
  const [ArticleState, setArticle] = useRecoilState(articleState);
  const { thumbnailUrl, introduction, title, tags, content } = ArticleState;
  const router = useRouter();
  const { data: session } = useSession();
  const postArticleMutation = usePostArticle();
  dayjs.locale("ko");

  const handleFileUpload = async () => {
    if (!title) {
      alert("제목을 작성해주세요");
      return;
    }
    try {
      await postArticleMutation.mutateAsync({
        content,
        tags,
        title,
        thumbnailUrl,
        introduction,
        syncTime: dayjs().format("YYYY년 MM월 DD일 HH:mm"),
      });
      await router.push({ pathname: `/${session?.user.email}` });
      resetArticle();
    } catch (err) {
      alert("upload failed.");
    }
  };

  return (
    <Modal isActive={isActive}>
      <ModalContainer>
        <ModalLayout>
          <H2>썸네일 미리보기</H2>
          <UploadContainer>
            <ImageUpload />
            <IntroductionContainer>
              <h1>{title}</h1>
              <TextArea
                rows={4}
                maxLength={30}
                label={"짧게 소개하기"}
                value={introduction}
                onChange={(text: any) =>
                  setArticle({ ...ArticleState, introduction: text })
                }
              />
            </IntroductionContainer>
            <ButtonContainer>
              <Button
                variant="primary"
                size="large"
                rounded={true}
                onClick={handleFileUpload}
                aria-label="블로그 글 작성 완료하기"
              >
                완료
              </Button>
              <Button
                variant="primary"
                size="large"
                rounded={true}
                onClick={handleClose}
                aria-label="블로그 글 작성 취소하기"
              >
                취소
              </Button>
            </ButtonContainer>
          </UploadContainer>
        </ModalLayout>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: #1e1e1e;
  z-index: 15;
`;
const ModalLayout = styled.div`
  width: 768px;
  display: flex;
  flex-direction: column;
`;
const H2 = styled.h2`
  color: white;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
`;
const UploadContainer = styled.div`
  place-self: center;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const IntroductionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
`;
export default UploadModal;
