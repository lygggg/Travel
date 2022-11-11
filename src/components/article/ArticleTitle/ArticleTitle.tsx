import styled from "@emotion/styled";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { TagList } from "src/components/commons";
import { useDeleteArticle } from "src/hooks/api/useArticle";

interface Props {
  title: string;
  tags: string[];
  img: string;
  base64: string;
  syncTime: string;
  _id: string;
}
const ArticleTitle: React.FC<Props> = (article) => {
  const {
    query: { userId, id },
    push,
  } = useRouter();
  const { title, tags, img, base64, syncTime, _id } = article;

  const deleteArticleMutation = useDeleteArticle();

  const handleRemoveArticle = () => {
    deleteArticleMutation.mutate(id, {
      onSuccess: () => {
        push(`/${userId}`);
      },
      onError: () => {
        alert("delete failed.");
      },
    });
  };

  return (
    <Container>
      <Title>{title}</Title>
      <div>
        <Link href={{ pathname: "/write", query: { id: _id } }}>
          <span>수정</span>
        </Link>
        <span onClick={handleRemoveArticle}>삭제</span>
      </div>
      {syncTime}
      <ImageContainer>
        <Image
          src={img}
          fill
          placeholder="blur"
          blurDataURL={base64}
          alt={title}
        />
      </ImageContainer>
      <TagList tags={tags} size="small" />
    </Container>
  );
};

export default ArticleTitle;

const Container = styled.div`
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Title = styled.h1`
  font-size: 2.4rem;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
