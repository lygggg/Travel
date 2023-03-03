/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Article as ArticleProps } from "src/models/article";
import Image from "next/image";
import { List } from "src/components/commons";

interface Props {
  article: ArticleProps;
}

const item_css = {
  itemLayout: css({
    width: "350px",
    height: "350px",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    gap: "15px",
  }),
  imageLayout: css({
    borderRadius: "2rem",
    position: "relative",
    width: "350px",
    height: "250px",
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 0px 5px gray",
    },
  }),
  itemTitle: css({
    fontSize: "1.2rem",
    fontWeight: "bold",
  }),
  itemDate: css({ fontSize: "1rem", color: "gray" }),
};
``;

const FeaturedArticleItem = ({ article }: Props) => {
  return (
    <>
      <List.Item style={item_css.itemLayout} id={article._id}>
        <List.Layout style={item_css.imageLayout}>
          <Image
            fill
            alt=""
            style={{ borderRadius: "2rem" }}
            src={article.thumbnailUrl}
          ></Image>
        </List.Layout>
        <List.Title style={item_css.itemTitle}>{article.title}</List.Title>
        <List.Date style={item_css.itemDate}>{article.syncTime}</List.Date>
      </List.Item>
    </>
  );
};

export default FeaturedArticleItem;
