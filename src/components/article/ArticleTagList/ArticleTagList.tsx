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
      <TagList tags={tags} size="small" onClick={moveUrl} />
    </Container>
  );
};

const Container = styled.div`
  width: 768px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  padding: 60px;
`;

export default ArticleTagList;
