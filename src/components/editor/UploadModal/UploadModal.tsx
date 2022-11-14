import styled from "@emotion/styled";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useRecoilState, useResetRecoilState } from "recoil";
import { usePostArticle } from "src/hooks/api/useArticle";
import { Button, Modal, TextArea } from "src/components/commons";
import { articleState } from "src/store/article";
import { ImageUpload } from "../index";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface Props {
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

  const handleFileUpload = async () => {
    if (!tags.length) {
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
    if (!thumbnailUrl) {
      alert("썸네일을 업로드해주세요.");
      return;
    }
    dayjs.locale("ko");
    postArticleMutation.mutate(
      {
        content,
        tags,
        title,
        thumbnailUrl,
        introduction,
        syncTime: dayjs().format("YYYY년 MM월 DD일 HH:mm"),
      },
      {
        onSuccess: () => {
          router.push({ pathname: `/${session?.user.email}` });
          resetArticle();
        },
        onError: () => {
          alert("upload failed.");
        },
      },
    );
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
                rounded="round"
                onClick={handleFileUpload}
              >
                완료
              </Button>
              <Button
                variant="primary"
                size="large"
                rounded="round"
                onClick={handleClose}
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
  margin-bottom: 2rem;
`;
const UploadContainer = styled.div`
  place-self: center;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const ThumbnailContainer = styled.div`
  height: 250px;
  width: 400px;
  background-color: ${(props) => props.theme.primary[500]};
  display: flex;
  place-items: center;
  place-content: center;
`;
const IntroductionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Introduction = styled.textarea`
  width: 100%;
  height: 7rem;
  background-color: ${(props) => props.theme.primary[500]};
  border: none;
  outline: none;
  color: ${(props) => props.theme.white};
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
`;
export default UploadModal;
