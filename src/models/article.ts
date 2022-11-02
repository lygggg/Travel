export interface Article {
  _id: string;
  title: string;
  tags: string[];
  content: string;
  syncTime: string;
  name: string;
  email: string;
  src: string;
  introduction: string;
  thumbnailUrl: string;
}

export interface ArticleTag {
  _id: string;
  tagName: string;
  userId: string;
}

export interface findArticlesRequest {
  userId: string | string[] | undefined;
  tag: string | string[] | undefined;
}

export interface findArticleRequest {
  userId: string | string[] | undefined;
  id: string | string[] | undefined;
}

export interface PostArticleRequest {
  content: string;
  tags: string[];
  title: string;
  thumbnailUrl: string;
  introduction: string;
  syncTime: string;
}
