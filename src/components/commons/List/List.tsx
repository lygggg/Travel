/** @jsxImportSource @emotion/react */
import Link from "next/link";
import { SerializedStyles } from "@emotion/react";
import { ChildrenProps } from "src/models/children";

const List = ({ children, style }: ChildrenProps) => {
  return <ul css={style}>{children}</ul>;
};

interface ItemProps {
  id: string;
  children: React.ReactNode;
  style?: SerializedStyles;
}

const Item = ({ children, style, id }: ItemProps) => {
  return (
    <Link href={`/articles/${id}`}>
      <li css={style}>{children}</li>
    </Link>
  );
};

const Title = ({ children, style }: ChildrenProps) => {
  return <span css={style}>{children}</span>;
};

const Description = ({ children, style }: ChildrenProps) => {
  return <span css={style}>{children}</span>;
};

const Date = ({ children, style }: ChildrenProps) => {
  return <span css={style}>{children}</span>;
};

const Layout = ({ children, style }: ChildrenProps) => {
  return <div css={style}>{children}</div>;
};

List.Item = Item;
List.Title = Title;
List.Description = Description;
List.Date = Date;
List.Layout = Layout;
export default List;
