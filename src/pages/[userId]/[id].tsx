import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import styled from "@emotion/styled";
import { serialize } from "next-mdx-remote/serialize";
import { ArticleDetail, ArticleHead } from "src/components/article";
import { HeadMeta } from "src/components/commons";
import { findArticle } from "src/api/article";

const ArticleDetailPage = (
  article: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const {
    thumbnailUrl,
    title,
    MDXdata,
    introduction,
    _id,
    tags,
    content,
    syncTime,
    name,
    email,
  } = article;

  const articleHead = {
    _id,
    tags,
    content,
    syncTime,
    name,
    email,
    thumbnailUrl,
    title,
    introduction,
  };

  return (
    <Container>
      <HeadMeta
        title={title}
        image={thumbnailUrl}
        introduction={introduction}
      />
      <ArticleHead article={articleHead}></ArticleHead>
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
    const data = await findArticle({
      userId,
      id,
    });

    const MDXdata = await serialize(data.content);
    const article = {
      ...data,
      thumbnailUrl: data.thumbnailUrl,
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
