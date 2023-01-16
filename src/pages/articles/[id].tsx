import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { ArticleDetail, ArticleHead } from "src/components/article";
import { HeadMeta } from "src/components/commons";
import { mdxToHtml } from "src/libs/mdx";
import { connectMongo } from "../api/utils/connectMongo";
import { ArticleModel } from "../api/models/article";
import { Article } from "src/models/article";
import { findArticle } from "src/api/article";
import { useArticle } from "src/hooks/api/useArticle";

const ArticleDetailPage = ({
  MDXdata,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    query: { id },
  } = useRouter();
  const { data } = useArticle(id as string);

  return (
    <Container>
      <HeadMeta
        title={data.title}
        image={data.thumbnailUrl}
        introduction={data.introduction}
      />
      <ArticleHead article={data}></ArticleHead>
      <ArticleDetail content={MDXdata} />
    </Container>
  );
};

export const getStaticPaths = async () => {
  try {
    await connectMongo();
    const res = await ArticleModel.find();
    const articles = JSON.parse(JSON.stringify(res));
    const paths = articles.map((article: Article) => ({
      params: { id: article?._id },
    }));
    return { paths, fallback: false };
  } catch (error) {
    console.log(error);
    return { paths: [], fallback: false };
  }
};
export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  try {
    await connectMongo();
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["article"], () =>
      findArticle(params?.id as string),
    );
    const res = queryClient.getQueryData(["article"]);
    const data = JSON.parse(JSON.stringify(res));

    const { html } = await mdxToHtml(data.content);
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        MDXdata: html,
      },
    };
  } catch (err) {
    alert("get article failed.");
    return {
      props: {},
    };
  }
};
export default ArticleDetailPage;

const Container = styled.article`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 100px;
  width: 768px;
  flex-grow: 10;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
`;
