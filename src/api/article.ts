import api from "./core";
import {
  findArticlesRequest,
  findArticleRequest,
  PostArticleRequest,
} from "src/models/article";

export const postArticle = async (data: PostArticleRequest) => {
  await api.post("/api/article", data);
};

export const findArticles = async ({ userId, tag }: findArticlesRequest) => {
  const { data } = await api.get(
    encodeURI(`/api/users/${userId as string}/articles?q=${tag as string}`),
  );
  return data;
};

export const findArticle = async ({ userId, id }: findArticleRequest) => {
  const { data } = await api.get(
    encodeURI(`/api/users/${userId as string}/articles/${id as string}`),
  );
  return data;
};
