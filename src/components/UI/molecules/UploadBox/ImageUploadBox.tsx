import styled from "@emotion/styled";
import { useS3Upload } from "next-s3-upload";
import { useState } from "react";
import { Button } from "src/components/UI/atoms";
import { deletefiles } from "src/api/file";

const ImageUploadBox = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageKey, setImageKey] = useState<string>("");
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  const handleFileChange = async (file: File) => {
    try {
      const { url, key } = await uploadToS3(file);
      setImageKey(key);
      setImageUrl(url);
    } catch {
      alert("upload failed.");
    }
  };
  // TODO error handling
  const handleFileRemove = async () => {
    try {
      await deletefiles(imageKey);
      setImageUrl("");
    } catch (e) {
      alert("Deletion failed.");
    }
  };
  return (
    <>
      <FileInput onChange={handleFileChange} />
      <ButtonContainer>
        {imageUrl ? (
          <Button width="100px" height="40px" onClick={handleFileRemove}>
            사진 제거
          </Button>
        ) : (
          <Button width="100px" height="40px" onClick={openFileDialog}>
            사진 업로드
          </Button>
        )}
      </ButtonContainer>
      <ImageContainer>{imageUrl && <img src={imageUrl} />}</ImageContainer>
    </>
  );
};

const ButtonContainer = styled.div`
  align-self: end;
`;
const ImageContainer = styled.div`
  height: 100px;
  width: 100px;
`;
export default ImageUploadBox;
