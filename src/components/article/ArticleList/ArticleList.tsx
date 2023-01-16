import { Article as ArticleProps } from "src/models/article";
import { ArticleBox } from "src/components/article";
import styled from "@emotion/styled";

interface Props {
  articles: Array<ArticleProps>;
  limit: number;
  count: number;
}

const ArticleList: React.FC<Props> = ({ articles, limit, count }: Props) => {
  return (
    <Container>
      {articles
        .map((article) => <ArticleBox key={article._id} article={article} />)
        .slice(0, limit * count)}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 100px;
  width: 100%;
  flex-grow: 10;
  margin-left: auto;
  margin-right: auto;
`;

export default ArticleList;
