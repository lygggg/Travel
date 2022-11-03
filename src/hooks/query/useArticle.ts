import { useQuery } from "@tanstack/react-query";
import { findArticles } from "src/api/article";
import { findArticlesRequest } from "src/models/article";

export const useArticles = ({ userId, tag }: findArticlesRequest) => {
  return useQuery(["articles", userId], () => findArticles({ userId, tag }));
};
