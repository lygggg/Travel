import styled from "@emotion/styled";
import { useS3Upload } from "next-s3-upload";
import { useState } from "react";
import { postArticle } from "src/api/article";
import { Button, Modal } from "src/components/commons";
import { deletefiles } from "src/api/file";

interface Props {
  content: string;
  tag: string;
  title: string;
  handleModalOpen: () => void;
}

const UploadModal = ({ content, tag, title, handleModalOpen }: Props) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [imageKey, setImageKey] = useState<string>("");
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
    try {
      await postArticle({ content, tag, title, thumbnailUrl });
    } catch (e) {
      alert("upload failed.");
    }
  };

  return (
    <Modal>
      <H2>썸네일 미리보기</H2>
      <UploadContainer>
        <FileInput onChange={handleFileChange} />
        <ButtonContainer>
          {thumbnailUrl ? (
            <Button width="100px" height="40px" onClick={handleFileRemove}>
              사진 제거
            </Button>
          ) : (
            <Button width="100px" height="40px" onClick={openFileDialog}>
              사진 업로드
            </Button>
          )}
        </ButtonContainer>
        <ThumbnailContainer>
          {thumbnailUrl && <Thumbnail src={thumbnailUrl} />}
        </ThumbnailContainer>
        <ButtonContainer>
          <Button width="100px" height="40px" onClick={handleFileUpload}>
            완료
          </Button>
          <Button width="100px" height="40px" onClick={handleModalOpen}>
            취소
          </Button>
        </ButtonContainer>
      </UploadContainer>
    </Modal>
  );
};

const H2 = styled.h2`
  color: white;
  text-align: center;
`;
const UploadContainer = styled.div`
  place-self: center;
`;
const ThumbnailContainer = styled.div`
  height: 250px;
  width: 400px;
`;
const ButtonContainer = styled.div`
  text-align: end;
`;
const Thumbnail = styled.img`
  height: 250px;
  width: 400px;
`;
export default UploadModal;
