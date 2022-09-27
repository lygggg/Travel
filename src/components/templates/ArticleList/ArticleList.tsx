import { useState, useEffect } from "react";
import { findArticles } from "src/api/article";
import { ArticleBox } from "src/components/UI//molecules";
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
      <div>
        {articles.map((article: ArticleProps) => (
          <div key={article._id}>
            <ArticleBox article={article} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ArticleList;
