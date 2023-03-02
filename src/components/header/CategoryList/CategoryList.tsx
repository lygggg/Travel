import { useState } from "react";
import Link from "next/link";
import { CategoryItem } from "../CategoryItem";

interface Props {
  categorys: { title: string; url: string }[];
  onSelected: (value: string) => void;
  selected: string;
}

const CategoryList: React.FC<Props> = ({ categorys, selected, onSelected }) => {
  return (
    <>
      {categorys.map((category) => (
        <Link href={`${category.url}`}>
          <CategoryItem
            onSelected={onSelected}
            selected={selected}
            key={category.title}
            tag={category.title}
          />
        </Link>
      ))}
    </>
  );
};

export default CategoryList;
