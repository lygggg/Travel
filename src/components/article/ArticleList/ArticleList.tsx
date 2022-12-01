import { Article as ArticleProps } from "src/models";
import { ArticleBox } from "src/components/article";
import styled from "@emotion/styled";

interface Props {
  articles: Array<ArticleProps>;
}

const ArticleList: React.FC<Props> = ({ articles }: Props) => {
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
  width: 768px;
  flex-grow: 10;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
`;

export default ArticleList;
