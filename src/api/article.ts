import api from "./core";

interface postArticleProps {
  content: string;
  tag: string;
  title: string;
}
export const postArticle = async (data: postArticleProps) => {
  await api.post("/api/article", data);
};
