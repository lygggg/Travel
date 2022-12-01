import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { TagList } from "src/components/commons";

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
      <TagList tags={tags} size="mini" onClick={moveUrl} />
    </Container>
  );
};

const Container = styled.div`
  width: 768px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  gap: 0.6rem;
`;

export default ArticleTagList;
