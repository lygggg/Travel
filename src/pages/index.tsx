import styled from "@emotion/styled";
import type { NextPage } from "next";
import { Hero } from "src/components/commons/Hero";
import { Main } from "src/components/home/Main";
import { FeatureArticleList } from "src/components/home/FeatureArticleList";
import { useArticles } from "src/hooks/api/useArticle";

const ITEMCOUNT = 6;

const Home: NextPage = () => {
  const { data, isLoading } = useArticles();
  if (isLoading) {
    return null;
  }
  return (
    <Container>
      <Main />
      <ListLayout>
        <Hero text="Featured Aritcles" listLength={data.length} />
        <FeatureArticleList articles={data} limit={1} count={ITEMCOUNT} />
      </ListLayout>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  row-gap: 70px;
  flex-direction: column;
  place-items: center;
  min-height: 80vh;
  height: 100%;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
  padding: 30px 25px 50px 25px;
`;

const ListLayout = styled.div``;

export default Home;
