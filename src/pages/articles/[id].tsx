import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import ArticleModel from "src/pages/api/models/article";
import connectMongo from "src/pages/api/utils/connectMongo";
import { ArticleInteface } from "interface";

const Article = ({
  title,
  tag,
  MDXdata,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div>{title}</div>
      <div>{tag}</div>
      <MDXRemote {...MDXdata} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  await connectMongo();
  const res = await ArticleModel.find();
  const articles = JSON.parse(JSON.stringify(res));
  const paths = articles.map((article: ArticleInteface) => ({
    params: { id: article?._id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  await connectMongo();
  const res = await ArticleModel.findById(params?.id);
  const { title, tag, content } = JSON.parse(JSON.stringify(res));
  const MDXdata = await serialize(content);

  return { props: { title, tag, MDXdata } };
};
export default Article;
