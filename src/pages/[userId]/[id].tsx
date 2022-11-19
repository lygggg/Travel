import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useEffect } from "react";
import styled from "@emotion/styled";
import { getPlaiceholder } from "plaiceholder";
import { serialize } from "next-mdx-remote/serialize";
import { useSetRecoilState } from "recoil";
import { ArticleDetail, ArticleTitle } from "src/components/article";
import { HeadMeta } from "src/components/commons";
import { findArticle } from "src/api/article";
import { articleState } from "src/store/article";

const ArticleDetailPage = (
  article: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const setArticle = useSetRecoilState(articleState);
  const {
    content,
    thumbnailUrl,
    base64,
    img,
    title,
    tags,
    MDXdata,
    syncTime,
    introduction,
    _id,
    name,
    email,
  } = article;

  useEffect(() => {
    setArticle({ content, tags, title, thumbnailUrl, introduction, syncTime });
  }, []);

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
        name={name}
        email={email}
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
    const data = await findArticle({
      userId,
      id,
    });
    const { base64, img } = await getPlaiceholder(data.thumbnailUrl);
    const MDXdata = await serialize(data.content);
    const article = {
      ...data,
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
  margin-top: 5.5rem;
`;
