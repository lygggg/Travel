import { Article } from "src/model/article";

interface ArticleProps {
  article: Article;
}

const ArticleBox = ({ article }: ArticleProps) => {
  const { title, tag } = article;
  return (
    <>
      <div>
        {title}
        {tag}
      </div>
    </>
  );
};

export default ArticleBox;
