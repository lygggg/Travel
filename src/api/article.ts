import api from "./core";

interface PostArticleRequest {
  content: string;
  tag: string;
  title: string;
}
export const postArticle = async (data: PostArticleRequest) => {
  await api.post("/api/article", data);
};

export const findArticles = async () => {
  const articles = await api.get("/api/article");
  return articles;
};