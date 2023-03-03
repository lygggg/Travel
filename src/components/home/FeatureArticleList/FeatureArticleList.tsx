import { css } from "@emotion/react";
import { Article as ArticleProps } from "src/models/article";
import { List } from "src/components/commons";
import { FeatureArticleItem } from "../FeatureArticleItem";

const breakpoints = [576, 768, 992, 1200];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

interface Props {
  articles: ArticleProps[];
  limit: number;
  count: number;
}

const list_css = {
  list: css({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    width: "100%",
    margin: "0 auto",
    marginTop: "40px",
    gridGap: "20px",
    justifyItems: "center",
    [mq[3]]: { gridTemplateColumns: "repeat(2, 1fr)", width: "100%" },
    [mq[1]]: { gridTemplateColumns: "repeat(1, 1fr)", width: "100%" },
  }),
};
``;

const FeatureArticleList: React.FC<Props> = ({ articles, limit, count }) => {
  return (
    <List style={list_css.list}>
      {articles
        .map((article) => (
          <FeatureArticleItem
            key={article._id}
            article={article}
          ></FeatureArticleItem>
        ))
        .slice(0, limit * count)}
    </List>
  );
};

export default FeatureArticleList;
