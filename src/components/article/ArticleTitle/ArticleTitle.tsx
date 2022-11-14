import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Button, TagList } from "src/components/commons";
import { useDeleteArticle } from "src/hooks/api/useArticle";

interface Props {
  title: string;
  tags: string[];
  img: string;
  base64: string;
  syncTime: string;
  _id: string;
  name: string;
  email: string;
}
const ArticleTitle: React.FC<Props> = (article) => {
  const {
    query: { userId, id },
    push,
  } = useRouter();
  const { data: session } = useSession();
  const { title, tags, img, base64, syncTime, _id, email } = article;

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
      {session?.user.email === email && (
        <EndContainer>
          <Link href={{ pathname: "/write", query: { id: _id } }}>
            <Button variant="primary" size="mini" rounded="default">
              수정
            </Button>
          </Link>
          <Button
            variant="primary"
            size="mini"
            rounded="default"
            onClick={handleRemoveArticle}
          >
            삭제
          </Button>
        </EndContainer>
      )}
      {syncTime}
      <TagList tags={tags} size="small" />
      <ImageContainer>
        <Image
          src={img}
          fill
          placeholder="blur"
          blurDataURL={base64}
          alt={title}
        />
      </ImageContainer>
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

const EndContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  align-self: end;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 800;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
