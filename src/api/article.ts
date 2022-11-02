import api from "./core";
import { findArticleRequest, PostArticleRequest } from "src/models/article";

export const postArticle = async (data: PostArticleRequest) => {
  await api.post("/api/article", data);
};

export const findArticles = async ({ userId, tag }: findArticleRequest) => {
  const { data } = await api.get(
    encodeURI(`/api/users/${userId as string}/articles?q=${tag as string}`),
  );
  return data;
};
