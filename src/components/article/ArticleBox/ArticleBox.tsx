import { Article as ArticleProps } from "src/models";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";

interface Props {
  article: ArticleProps;
}

const ArticleBox = ({ article }: Props) => {
  const { title, tag, syncTime, img, base64 } = article;
  return (
    <>
      <Link href={`/articles/${article._id}`}>
        <Container>
          <ImageContainer>
            <Image
              src={img}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              placeholder="blur"
              blurDataURL={base64}
              alt={title}
            />
          </ImageContainer>
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

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
export default ArticleBox;
