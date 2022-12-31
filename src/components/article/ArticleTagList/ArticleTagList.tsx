import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { Chip } from "src/components/commons";

export interface Props {
  tags: string[];
}

const ArticleTagList: React.FC<Props> = ({ tags }) => {
  const router = useRouter();
  const moveUrl = (tag: string) => {
    router.push({
      pathname: router.query.userId as string,
      query: { tag },
    });
  };
  return (
    <Container data-testid="article-taglist">
      <TagContainer>
        {tags.map((tag: string) => (
          <Chip
            size="small"
            key={tag}
            onClick={moveUrl}
            data-testid="article-tag"
          >
            {tag}
          </Chip>
        ))}
      </TagContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 768px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  padding: 3rem;
  gap: 0.6rem;
`;

const TagContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

export default ArticleTagList;
