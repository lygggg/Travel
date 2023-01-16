export interface Article {
  _id: string;
  title: string;
  tags: string[];
  content: string;
  syncTime: string;
  name: string;
  email: string;
  introduction: string;
  thumbnailUrl: string;
  MDXdata?: object;
}

export interface ArticleTag {
  _id: string;
  tagName: string;
  userId: string;
}

export interface PostArticleRequest {
  content: string;
  tags: string[];
  title: string;
  thumbnailUrl: string;
  introduction: string;
  syncTime: string;
  _id: string;
}

export interface ArticleTag {
  _id: string;
  categoryName: string;
  articleId: string;
  userId: string;
}
