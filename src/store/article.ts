import { atom } from "recoil";
import { PostArticleRequest } from "src/models/article";

export const articleState = atom<PostArticleRequest>({
  key: "article",
  default: {
    content: "",
    tags: [],
    title: "",
    thumbnailUrl: "",
    introduction: "",
    syncTime: "",
  },
});
