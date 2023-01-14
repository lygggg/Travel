import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import styled from "@emotion/styled";
import { ArticleDetail, ArticleHead } from "src/components/article";
import { HeadMeta } from "src/components/commons";
import { mdxToHtml } from "src/libs/mdx";
import { connectMongo } from "../api/utils/connectMongo";
import { ArticleModel } from "../api/models/article";
import { Article } from "src/models/article";

const ArticleDetailPage = (
  article: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const articleHead = {
    _id: article._id,
    tags: article.tags,
    content: article.content,
    syncTime: article.syncTime,
    name: article.name,
    email: article.email,
    thumbnailUrl: article.thumbnailUrl,
    title: article.title,
    introduction: article.introduction,
  };

  return (
    <Container>
      <HeadMeta
        title={article.title}
        image={article.thumbnailUrl}
        introduction={article.introduction}
      />
      <ArticleHead article={articleHead}></ArticleHead>
      <ArticleDetail content={article.MDXdata} />
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
    const res = await ArticleModel.findOne({ _id: params?.id }).lean();
    const data = JSON.parse(JSON.stringify(res));
    const { html } = await mdxToHtml(data.content);
    const article = {
      ...data,
      thumbnailUrl: data.thumbnailUrl,
      MDXdata: html,
    };
    return { props: article };
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
