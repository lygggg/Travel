import styled from "@emotion/styled";
import Image from "next/image";
import { Tag } from "src/components/commons";

interface Props {
  title: string;
  tags: string[];
  img: string;
  base64: string;
  syncTime: string;
}
const ArticleTitle: React.FC<Props> = (article) => {
  const { title, tags, img, base64, syncTime } = article;
  return (
    <Container>
      <Title>{title}</Title>
      {syncTime}
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
      <Tag tags={tags} size="small" />
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
