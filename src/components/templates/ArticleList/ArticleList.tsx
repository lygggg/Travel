import { useState, useEffect } from "react";
import { findArticles } from "src/api/article";
import { ArticleBox } from "src/components/UI//molecules";
import { ArticleInteface } from "interface";

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
        {articles.map((article: ArticleInteface) => (
          <div key={article._id}>
            <ArticleBox article={article} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ArticleList;
