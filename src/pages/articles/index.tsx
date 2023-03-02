import { useState } from "react";
import { useRouter } from "next/router";
import type { GetStaticProps } from "next";
import styled from "@emotion/styled";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { ArticleList, ArticleTagList } from "src/components/article";
import { findArticles } from "src/api/article";
import { findTag } from "src/api/tag";
import { useArticles } from "src/hooks/api/useArticle";
import { useTag } from "src/hooks/api/useTag";
import { PaginationButton } from "src/components/commons/PaginationButton";
import { Button } from "src/components/commons";
import { Hero } from "src/components/commons/Hero";

const ITEMCOUNT = 5;

const ArticlePage = () => {
  const [limit, setLimit] = useState(1);
  const { query } = useRouter();
  const { data: articles = [], isLoading } = useArticles(query.tags);
  const { data: tags = [] } = useTag();

  if (isLoading) {
    return null;
  }
  return (
    <Container>
      <Hero text="Articles" listLength={articles.length} />

      <ArticleTagList tags={tags} />
      <Hr />
      <ArticleList articles={articles} limit={limit} count={ITEMCOUNT} />
      <PaginationContainer>
        <PaginationButton
          total={articles?.length}
          dataLength={limit * ITEMCOUNT || 0}
          event={() => setLimit((limit) => limit + 1)}
          button={
            <Button
              size="medium"
              variant="primary"
              aria-label="글 목록 더 가져오기"
            >
              목록 더 보기
            </Button>
          }
        />
      </PaginationContainer>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(["articles"], () => findArticles()),
    queryClient.prefetchQuery(["tag"], () => findTag()),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ArticlePage;

const PaginationContainer = styled.div`
  text-align: center;
  margin-top: 50px;
  margin-bottom: 40px;
`;

const Container = styled.div`
  padding-bottom: 35px;
  margin: 0 auto;
  margin-top: 70px;
  max-width: 700px;
  height: 100%;
`;

const Hr = styled.hr`
  margin: 2rem 0px;
  flex-shrink: 0;
  border-width: 0px 0px thin;
  border-style: solid;
  border-color: var(--color-border);
`;
