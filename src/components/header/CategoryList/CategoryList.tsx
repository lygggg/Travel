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
        <div key={category.title}>
          <Link href={`${category.url}`}>
            <CategoryItem
              onSelected={onSelected}
              selected={selected}
              tag={category.title}
            />
          </Link>
        </div>
      ))}
    </>
  );
};

export default CategoryList;
