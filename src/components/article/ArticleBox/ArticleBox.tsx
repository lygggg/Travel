import { Article as ArticleProps } from "src/types/article";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";

const ArticleBox = ({ article }: { article: ArticleProps }) => {
  const { title, tag, syncTime, thumbnailUrl } = article;
  return (
    <>
      <Link href={"article/fd"}>링크</Link>
      <Link href={`/articles/${article._id}`}>
        <Container>
          <div>{title}</div>
          <div>{tag}</div>
          <div>{syncTime}</div>
          <Image src={thumbnailUrl} width={250} height={250} />
        </Container>
      </Link>
    </>
  );
};

const Container = styled.div``;
export default ArticleBox;
