import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { findArticles } from "src/api/article";
import { ArticleBox } from "../index";
import { Article as ArticleProps } from "src/types";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  const listUpArticles = async () => {
    const { data } = await findArticles();
    setArticles(data);
  };

  useEffect(() => {
    listUpArticles();
  }, []);

  return (
    <>
      <Container>
        {articles.map((article: ArticleProps) => (
          <div key={article._id}>
            <ArticleBox article={article} />
          </div>
        ))}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  grid-row-gap: 50px;
  flex-direction: column;
  text-align: center;
`;
export default ArticleList;
