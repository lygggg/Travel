import styled from "@emotion/styled";
import TagItem from "./TagItem";
import { ArticleTag } from "src/models/article";

interface Props {
  tags: ArticleTag[] | string[];
  size: "mini" | "small" | "medium" | "large";
  onClick?: (tag: string) => void;
  onRemove?: (tag: string) => void;
}

const TagList: React.FC<Props> = ({ tags, size, onClick, onRemove }) => {
  return (
    <TagContainer>
      {tags.map((tag: any) => (
        <TagItem
          size={size}
          key={tag._id ?? tag}
          onClick={onClick}
          onRemove={onRemove}
        >
          {tag.tagName ?? tag}
        </TagItem>
      ))}
    </TagContainer>
  );
};

const TagContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

export default TagList;
