import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession, signIn } from "next-auth/react";
import { getPlaiceholder } from "plaiceholder";
import styled from "@emotion/styled";
import { ArticleBox } from "src/components/article";
import { Article as ArticleProps } from "src/models";
import Article from "src/pages/api/models/article";
import connectMongo from "src/pages/api/utils/connectMongo";

interface Props {
  articles: Array<ArticleProps>;
  session: string;
}
const ArticleList = ({ articles, session }: Props) => {
  if (!session) {
    signIn();
  }
  return (
    <>
      <Container>
        {articles.map((article) => (
          <ArticleBox key={article._id} article={article} />
        ))}
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  await connectMongo();
  const session = await getSession(context);
  context.res.setHeader(
    "Cache-Control",
    "public, max-age=0, s-maxage=31536000",
  );
  try {
    const data = await Article.find({ email: session?.user?.email }).lean();

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
        session: session,
      },
    };
  } catch (err) {
    alert("Deletion failed.");
    return {
      props: {
        articles: {},
      },
    };
  }
};
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 100px;
  width: 100%;
  border: 1px solid #eaeaea;
  flex-grow: 10;
`;
export default ArticleList;
