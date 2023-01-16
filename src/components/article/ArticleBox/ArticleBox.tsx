import { Article as ArticleProps } from "src/models/article";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
import { Chip } from "src/components/commons";

interface Props {
  article: ArticleProps;
}

const ArticleBox: React.FC<Props> = ({ article }: Props) => {
  const { title, tags, syncTime, thumbnailUrl, introduction, email } = article;
  return (
    <>
      <Link href={`/articles/${article._id}`}>
        <Container>
          {thumbnailUrl && (
            <ImageContainer>
              <Image src={thumbnailUrl} fill alt={title} />
            </ImageContainer>
          )}
          <Title data-testid="article-title">{title}</Title>
          <Introduction data-testid="article-description">
            {introduction}
          </Introduction>
          <TagContainer>
            {tags.map((tag: string) => (
              <Chip size="mini" key={tag} data-testid="article-item-tag">
                {tag}
              </Chip>
            ))}
          </TagContainer>
          <Time data-testid="article-time">{syncTime}</Time>
        </Container>
      </Link>
    </>
  );
};

const Container = styled.div`
  width: 650px;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  gap: 15px;
`;

const TagContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
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

const ImageContainer = styled.div`
  height: 320px;
  position: relative;
`;
export default ArticleBox;
