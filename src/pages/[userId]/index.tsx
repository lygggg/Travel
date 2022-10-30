import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getPlaiceholder } from "plaiceholder";
import { ArticleList } from "src/components/article";
import {
  Article as ArticleProps,
  ArticleTag as ArticleTagProps,
} from "src/models";
import Article from "src/pages/api/models/article";
import Category from "src/pages/api/models/category";
import connectMongo from "src/pages/api/utils/connectMongo";

interface Props {
  articles: Array<ArticleProps>;
  tags: Array<ArticleTagProps>;
}
const ArticlePage = ({ articles, tags }: Props) => {
  return (
    <>
      {console.log(articles)}
      <ArticleList articles={articles} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}: GetServerSidePropsContext) => {
  await connectMongo();
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=31536000");
  try {
    const data = await Article.find({ email: query.userId }).lean();
    const tags = await Category.find({ userId: query.userId });

    const articles = await Promise.all(
      data.map(async (article) => {
        const { base64, img } = await getPlaiceholder(article.thumbnailUrl);
        return {
          ...article,
          base64,
          img,
        };
      }),
    ).then((values) => values);
    return {
      props: {
        articles: JSON.parse(JSON.stringify(articles)),
        tags: tags,
      },
    };
  } catch (err) {
    alert("article get failed.");
    return {
      props: {
        articles: {},
      },
    };
  }
};

export default ArticlePage;
