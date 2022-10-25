import { Article as ArticleProps } from "src/models";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";

interface Props {
  article: ArticleProps;
}

const ArticleBox = ({ article }: Props) => {
  const { title, tags, syncTime, img, base64 } = article;
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
          <TagList>
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagList>
          <span>{syncTime}</span>
        </Container>
      </Link>
    </>
  );
};

const Container = styled.div`
  width: 410px;
  height: 350px;
  border-radius: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Tag = styled.div`
  color: ${(props) => props.theme.white};
  padding: 0.25rem;
  font-size: 1.2rem;
  background-color: ${(props) => props.theme.gray[400]};
  border-radius: 6px;
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
