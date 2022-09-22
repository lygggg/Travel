import { useState, useEffect } from "react";
import { findArticles } from "../../../api/article";
import { Button, Input } from "../../UI/atoms";
import { ArticleBox } from "../../UI/molecules";

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
        {articles.map((article: any) => (
          <div key={article._id}>
            <ArticleBox article={article} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ArticleList;
