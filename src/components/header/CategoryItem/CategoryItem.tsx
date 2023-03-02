import Link from "next/link";
import styled from "@emotion/styled";
import { useState } from "react";

export interface Props {
  tag: string;
  onSelected: (value: string) => void;
  selected: string;
}

const CategoryItem: React.FC<Props> = ({ tag, onSelected, selected }) => {
  const TagClickHandler = (tag: string) => {
    onSelected(tag);
  };
  return (
    <TagLayout
      selected={selected}
      tag={tag}
      onClick={() => TagClickHandler(tag)}
    >
      {tag}
    </TagLayout>
  );
};

interface StyleProps {
  selected: string;
  tag: string;
}

const TagLayout = styled.span<StyleProps>`
  font-weight: 600;
  color: ${(props) =>
    props.selected === props.tag ? props.theme.white : props.theme.gray[400]};
  &:hover {
    color: ${(props) => props.theme.white};
    cursor: pointer;
  }
`;

export default CategoryItem;
