export interface Article {
  _id: string;
  title: string;
  tags: string[];
  content: string;
  img: string;
  syncTime: string;
  name: string;
  email: string;
  src: string;
  base64: string;
  introduction: string;
}

export interface ArticleTag {
  _id: string;
  categoryName: string;
  articleId: string;
  userId: string;
}
