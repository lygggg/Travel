import { useQuery } from "@tanstack/react-query";
import { findArticles } from "src/api/article";
import { findArticleRequest } from "src/models/article";

export const useArticle = ({ userId, tag }: findArticleRequest) => {
  return useQuery(["article", userId], () => findArticles({ userId, tag }));
};
