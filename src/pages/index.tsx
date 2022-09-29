import type { NextPage } from "next";
import Head from "next/head";
import { ArticleList } from "../components/templates";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <ArticleList />
    </>
  );
};

export default Home;