import { Article as ArticleProps } from "src/models";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";

interface Props {
  article: ArticleProps;
}

const ArticleBox = ({ article }: Props) => {
  const { title, tags, syncTime, img, base64, introduction } = article;
  return (
    <>
      <Link href={`/articles/${article._id}`}>
        <Container>
          <ImageContainer>
            <Image
              src={img}
              fill
              placeholder="blur"
              blurDataURL={base64}
              alt={title}
            />
          </ImageContainer>
          <Title>{title}</Title>
          <Introduction>{introduction}</Introduction>
          <TagList>
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagList>
          <Time>{syncTime}</Time>
        </Container>
      </Link>
    </>
  );
};

const Container = styled.div`
  width: 650px;
  height: 450px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  gap: 0.6rem;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const Introduction = styled.h2`
  font-size: 1.5rem;
  color: ${(props) => props.theme.gray[400]};
`;

const Time = styled.h3`
  font-size: 1rem;
`;
const Tag = styled.div`
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0.25rem;
  font-size: 1rem;
  background-color: ${(props) => props.theme.gray[400]};
  border-radius: 2rem;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
export default ArticleBox;
