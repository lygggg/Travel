import { Article as ArticleProps } from "src/models";
import { ArticleBox } from "src/components/article";
import styled from "@emotion/styled";

interface Props {
  articles: Array<ArticleProps>;
}

const ArticleList = ({ articles }: Props) => {
  return (
    <Container>
      {articles.map((article) => (
        <ArticleBox key={article._id} article={article} />
      ))}
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
