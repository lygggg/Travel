import { Article as ArticleProps } from "src/models";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
import { TagList } from "src/components/commons";

interface Props {
  article: ArticleProps;
}

const ArticleBox: React.FC<Props> = ({ article }: Props) => {
  const { title, tags, syncTime, thumbnailUrl, introduction, email } = article;
  return (
    <>
      <Link href={`/${email}/${article._id}`}>
        <Container>
          <ImageContainer>
            <Image src={thumbnailUrl} fill alt={title} />
          </ImageContainer>
          <Title>{title}</Title>
          <Introduction>{introduction}</Introduction>
          <TagList tags={tags} size="mini" />
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
  gap: 15px;
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
  width: 100%;
  height: 100%;
  position: relative;
`;
export default ArticleBox;
