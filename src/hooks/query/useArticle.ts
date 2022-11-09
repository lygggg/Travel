import { useQuery } from "@tanstack/react-query";
import { findArticles } from "src/api/article";
import { findArticlesRequest } from "src/models/article";

export const useArticles = ({ userId, tag, pageNum }: findArticlesRequest) => {
  return useQuery(
    ["articles", userId],
    () => findArticles({ userId, tag, pageNum }),
    {
      keepPreviousData: true,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  );
};
