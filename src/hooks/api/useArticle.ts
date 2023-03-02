import { checkIncludeArr } from "./../../utils/array";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  findArticles,
  postArticle,
  findArticle,
  deleteArticle,
} from "src/api/article";
import { convertToForceArray } from "src/utils/array";
import { Article } from "src/models/article";
import { query } from "src/models/query";

export const useArticles = (tags: query) => {
  const arr = convertToForceArray(tags);
  return useQuery(["articles"], () => findArticles(), {
    select: (data) => {
      if (arr.length > 0) {
        return data.filter((article: Article) => {
          return checkIncludeArr(arr, article.tags);
        });
      } else {
        return data;
      }
    },
  });
};

export const useArticle = (id: string) => {
  return useQuery(["article", id], () => findArticle(id));
};

export const usePostArticle = () => {
  return useMutation({ mutationFn: postArticle });
};

export const useDeleteArticle = () => {
  return useMutation({ mutationFn: deleteArticle });
};
