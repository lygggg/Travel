import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Button, TagList } from "src/components/commons";
import { useDeleteArticle } from "src/hooks/api/useArticle";
import { deleteArticle } from "src/api/article";

export interface Props {
  title: string;
  tags: string[];
  thumbnailUrl: string;
  base64: string;
  syncTime: string;
  _id: string;
  name: string;
  email: string;
}
const ArticleHead: React.FC<Props> = (article) => {
  const {
    query: { userId, id },
    push,
  } = useRouter();
  const { data: session } = useSession();
  const { title, tags, thumbnailUrl, base64, syncTime, _id, email } = article;

  const deleteArticleMutation = useDeleteArticle();

  const handleRemoveArticle = async () => {
    try {
      await deleteArticleMutation.mutateAsync(id);
      await push(`/${userId}`);
    } catch (err) {
      await alert("삭제 실패");
    }
  };

  return (
    <Container>
      <Title>{title}</Title>
      {session?.user.email === email && (
        <EndContainer>
          <Link href={{ pathname: "/write", query: { id: _id } }}>
            <Button variant="primary" size="mini">
              수정
            </Button>
          </Link>
          <Button variant="primary" size="mini" onClick={handleRemoveArticle}>
            삭제
          </Button>
        </EndContainer>
      )}
      {syncTime}
      <TagList tags={tags} size="small" />
      <ImageContainer>
        <Image
          src={thumbnailUrl}
          fill
          placeholder="blur"
          blurDataURL={base64}
          alt={title}
        />
      </ImageContainer>
    </Container>
  );
};

export default ArticleHead;

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
