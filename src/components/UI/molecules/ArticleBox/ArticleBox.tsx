import { ArticleInteface } from "interface/article";
import Link from "next/link";

interface ArticleProps {
  article: ArticleInteface;
}

const ArticleBox = ({ article }: ArticleProps) => {
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
