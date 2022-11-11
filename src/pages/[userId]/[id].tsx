import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import styled from "@emotion/styled";
import { getPlaiceholder } from "plaiceholder";
import { serialize } from "next-mdx-remote/serialize";
import { ArticleDetail, ArticleTitle } from "src/components/article";
import { HeadMeta } from "src/components/commons";
import { findArticle } from "src/api/article";

const ArticleDetailPage = (
  article: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { base64, img, title, tags, MDXdata, syncTime, introduction, _id } =
    article;
  return (
    <Container>
      <HeadMeta title={title} url={img} introduction={introduction} />
      <ArticleTitle
        title={title}
        tags={tags}
        base64={base64}
        img={img}
        syncTime={syncTime}
        _id={_id}
      ></ArticleTitle>
      <ArticleDetail content={MDXdata} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}: GetServerSidePropsContext) => {
  const { userId, id } = query;
  try {
    const { content, thumbnailUrl, ...rest } = await findArticle({
      userId,
      id,
    });
    const { base64, img } = await getPlaiceholder(thumbnailUrl);
    const MDXdata = await serialize(content);
    const article = {
      ...rest,
      base64,
      img,
      MDXdata,
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
