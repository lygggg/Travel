import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ArticleList, Category } from "src/components/article";
import { findArticles } from "src/api/article";
import { findTag } from "src/api/tag";
import { useArticle } from "src/hooks/query/useArticle";
import { useTag } from "src/hooks/query/useTag";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const ArticlePage = () => {
  const {
    query: { userId, tag },
  } = useRouter();
  const { data: articles, isLoading } = useArticle({ userId, tag });
  const { data: tags } = useTag(userId as string);

  if (isLoading) {
    return null;
  }
  return (
    <>
      <Category tags={tags} />
      <ArticleList articles={articles} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
  params,
}: GetServerSidePropsContext) => {
  const { userId, tag } = query;
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=31536000");
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(["article", userId], () =>
      findArticles({ userId, tag }),
    ),
    await queryClient.fetchQuery(["tag", userId], () =>
      findTag(userId as string),
    ),
  ]);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ArticlePage;
