/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Article as ArticleProps } from "src/models/article";
import Image from "next/image";
import { List } from "src/components/commons";
import { ItemTagList } from "../ItemTagList";

interface Props {
  article: ArticleProps;
}

const item_css = {
  itemLayout: css({
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    cursor: "pointer",
    gap: "15px",
  }),
  itemTitle: css({
    fontSize: "2rem",
  }),
  itemDescription: css({
    fontSize: "1.2rem",
    color: `#5D5D5D`,
  }),
  itemDate: css({ fontSize: "1rem", color: "gray" }),
  imageLayout: css({
    height: "320px",
    position: "relative",
    borderRadius: "2rem",
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 0px 5px white",
    },
  }),
};
``;

const ArticleItem = ({ article }: Props) => {
  return (
    <List.Item style={item_css.itemLayout} id={article._id}>
      <List.Layout style={item_css.imageLayout}>
        <Image
          fill
          alt=""
          style={{ objectFit: "cover", borderRadius: "2rem" }}
          src={article.thumbnailUrl}
        ></Image>
      </List.Layout>
      <List.Title style={item_css.itemTitle}>{article.title}</List.Title>
      <List.Description style={item_css.itemDescription}>
        {article.description}
      </List.Description>
      <ItemTagList tags={article.tags} />
      <List.Date style={item_css.itemDate}>{article.syncTime}</List.Date>
    </List.Item>
  );
};

export default ArticleItem;
