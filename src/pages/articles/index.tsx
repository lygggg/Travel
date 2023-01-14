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
import { useState } from "react";

const ITEMCOUNT = 5;

const ArticlePage = () => {
  const [limit, setLimit] = useState(1);
  const {
    data: { articles, total },
  } = useArticles();
  const { data: tags } = useTag();

  return (
    <Container>
      <ArticleTagList tags={tags} />
      <ArticleList articles={articles} limit={limit} count={ITEMCOUNT} />
      <PaginationContainer>
        <PaginationButton
          total={total}
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
`;
