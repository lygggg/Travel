/* eslint-disable @typescript-eslint/no-empty-function */
import { GetServerSideProps } from "next";
import { getServerSideSitemap } from "next-sitemap";
import { ArticleModel } from "src/pages/api/models/article";
import { connectMongo } from "src/pages/api/utils/connectMongo";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await connectMongo();
  const articles = await ArticleModel.find();
  const lastmod = new Date().toISOString();

  const AbsoluteFields = [
    {
      loc: `${process.env.NEXT_PUBLIC_URL}`, // Absolute url        changefreq: 'daily',
      changefreq: "daily",
      lastmod,
      priority: 0.7,
    },
  ];

  const articleFields = articles.map((article) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/${article.email}/${article._id}`,
    priority: 1.0,
    lastmod,
  }));

  const fields = [...AbsoluteFields, ...articleFields];

  return getServerSideSitemap(ctx, fields);
};

export default function Sitemap() {}
