import { Article as ArticleProps } from "src/models";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";

const ArticleBox = ({ article }: { article: ArticleProps }) => {
  const { title, tag, syncTime, src, base64 } = article;
  return (
    <>
      <Link href={`/articles/${article._id}`}>
        <Container>
          <ImageConatiner>
            <Image
              src={src}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={base64}
            />
          </ImageConatiner>
          <h2>{title}</h2>
          <div>{tag}</div>
          <span>{syncTime}</span>
        </Container>
      </Link>
    </>
  );
};

const Container = styled.article`
  width: 410px;
  height: 350px;
  border-radius: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const ImageConatiner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
export default ArticleBox;
