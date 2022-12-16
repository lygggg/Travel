import { useState } from "react";
import { useS3Upload } from "next-s3-upload";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { articleState } from "src/store/article";
import { Button } from "src/components/commons";
import { deletefiles } from "src/api/file";

const ImageUpload: React.FC = () => {
  const [imageKey, setImageKey] = useState("");
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const [ArticleState, setArticle] = useRecoilState(articleState);
  const { thumbnailUrl } = ArticleState;

  const handleFileChange = async (file: File) => {
    try {
      const { url, key } = await uploadToS3(file);
      setImageKey(key);
      setArticle({ ...ArticleState, thumbnailUrl: url });
    } catch {
      alert("upload failed.");
    }
  };

  const handleFileRemove = async () => {
    try {
      await deletefiles(imageKey);
      setArticle({ ...ArticleState, thumbnailUrl: "" });
    } catch (e) {
      alert("Deletion failed.");
    }
  };

  return (
    <>
      <FileInput onChange={handleFileChange} />
      <ButtonContainer>
        {thumbnailUrl ? (
          <Button
            variant="primary"
            size="large"
            rounded={true}
            onClick={handleFileRemove}
            aria-label="사진 제거하기"
          >
            사진 제거
          </Button>
        ) : (
          <Button
            variant="primary"
            size="large"
            rounded={true}
            onClick={openFileDialog}
            aria-label="사진 업로드하기"
          >
            사진 업로드
          </Button>
        )}
      </ButtonContainer>
      <ThumbnailContainer>
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            height={250}
            width={400}
            alt="썸네일 업로드 하기"
          />
        ) : (
          "사진을 업로드해주세요"
        )}
      </ThumbnailContainer>
    </>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
`;

const ThumbnailContainer = styled.div`
  height: 250px;
  width: 400px;
  background-color: ${(props) => props.theme.primary[500]};
  display: flex;
  place-items: center;
  place-content: center;
`;
export default ImageUpload;
