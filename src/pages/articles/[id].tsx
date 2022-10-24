import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import styled from "@emotion/styled";
import { getPlaiceholder } from "plaiceholder";
import { serialize } from "next-mdx-remote/serialize";
import ArticleModel from "src/pages/api/models/article";
import connectMongo from "src/pages/api/utils/connectMongo";
import { Article as ArticleProps } from "src/models";
import { ArticleDetail, ArticleTitle } from "src/components/article";

const ArticleDetailPage = (
  article: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { base64, img, title, tags, MDXdata, syncTime } = article;
  return (
    <Container>
      <ArticleTitle
        title={title}
        tags={tags}
        base64={base64}
        img={img}
        syncTime={syncTime}
      ></ArticleTitle>
      <ArticleDetail content={MDXdata} />
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  await connectMongo();
  const res = await ArticleModel.find();
  const articles = JSON.parse(JSON.stringify(res));
  const paths = articles.map((article: ArticleProps) => ({
    params: { id: article?._id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  try {
    await connectMongo();
    const data = await ArticleModel.findById(params?.id).lean();
    const { thumbnailUrl, title, tags, content, syncTime } = data;
    const { base64, img } = await getPlaiceholder(thumbnailUrl);
    const MDXdata = await serialize(content);
    const article = { base64, img, title, tags, MDXdata, syncTime };
    return { props: article };
  } catch (err) {
    alert("get article failed.");
    return {
      props: {},
    };
  }
};
export default ArticleDetailPage;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 100px;
  width: 768px;
  flex-grow: 10;
  margin-left: auto;
  margin-right: auto;
`;
