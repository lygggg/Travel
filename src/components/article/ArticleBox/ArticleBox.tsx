import { Article as ArticleProps } from "src/types/article";
import Link from "next/link";

const ArticleBox = ({ article }: { article: ArticleProps }) => {
  const { title, tag } = article;
  return (
    <>
      <Link href={`/articles/${article._id}`}>
        <div>
          {title}
          {tag}
        </div>
      </Link>
    </>
  );
};

export default ArticleBox;
