import { css } from "@emotion/react";
import { Article as ArticleProps } from "src/models/article";
import { List } from "src/components/commons";
import { ArticleItem } from "../ArticleItem";

interface Props {
  articles: ArticleProps[];
  limit: number;
  count: number;
}

const list_css = {
  list: css({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    flexWrap: "wrap",
    flexGrow: "10",
    justifyContent: "center",
    cursor: "pointer",
    gap: "100px",
    marginLeft: "auto",
    marginRight: "auto",
  }),
};
``;

const ArticleList: React.FC<Props> = ({ articles, limit, count }) => {
  return (
    <>
      <List style={list_css.list}>
        {articles
          .map((article) => (
            <ArticleItem key={article._id} article={article}></ArticleItem>
          ))
          .slice(0, limit * count)}
      </List>
    </>
  );
};

export default ArticleList;
