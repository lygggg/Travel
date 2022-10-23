import styled from "@emotion/styled";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useS3Upload } from "next-s3-upload";
import { useState } from "react";
import Image from "next/image";
import { postArticle } from "src/api/article";
import { Button, Modal, TextArea } from "src/components/commons";
import { deletefiles } from "src/api/file";

interface Props {
  content: string;
  tags: string[];
  title: string;
  handleModalOpen: () => void;
}

const UploadModal = ({ content, tags, title, handleModalOpen }: Props) => {
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [imageKey, setImageKey] = useState("");
  const [introduction, setIntroduction] = useState("");
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  const handleFileChange = async (file: File) => {
    try {
      const { url, key } = await uploadToS3(file);
      setImageKey(key);
      setThumbnailUrl(url);
    } catch {
      alert("upload failed.");
    }
  };

  // TODO error handling
  const handleFileRemove = async () => {
    try {
      await deletefiles(imageKey);
      setThumbnailUrl("");
    } catch (e) {
      alert("Deletion failed.");
    }
  };

  const handleFileUpload = async () => {
    if (!thumbnailUrl) {
      alert("썸네일을 업로드해주세요.");
      return;
    }
    try {
      dayjs.locale("ko");
      const syncTime = dayjs().format("YYYY년 MM월 DD일 HH:mm");
      await postArticle({
        content,
        tags,
        title,
        thumbnailUrl,
        introduction,
        syncTime,
      });
    } catch (e) {
      alert("upload failed.");
    }
  };

  return (
    <Modal>
      <ModalContainer>
        <ModalLayout>
          <H2>썸네일 미리보기</H2>
          <UploadContainer>
            <FileInput onChange={handleFileChange} />
            <ButtonContainer>
              {thumbnailUrl ? (
                <Button
                  variant="primary"
                  size="large"
                  rounded="round"
                  onClick={handleFileRemove}
                >
                  사진 제거
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="large"
                  rounded="round"
                  onClick={openFileDialog}
                >
                  사진 업로드
                </Button>
              )}
            </ButtonContainer>
            <ThumbnailContainer>
              {thumbnailUrl ? (
                <Image src={thumbnailUrl} height={250} width={400} />
              ) : (
                "사진을 업로드해주세요"
              )}
            </ThumbnailContainer>
            <IntroductionContainer>
              <h1>{title}</h1>
              <TextArea
                rows={4}
                maxLength={30}
                label={"짧게 소개하기"}
                value={introduction}
                onChange={setIntroduction}
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
                onClick={handleModalOpen}
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
