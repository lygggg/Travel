import styled from "@emotion/styled";
import TagItem from "./TagItem";

interface Props {
  tags: string[];
  size: "mini" | "small" | "medium" | "large";
  onClick?: (tag: string) => void;
  onRemove?: (tag: string) => void;
}

const TagList: React.FC<Props> = ({ tags, size, onClick, onRemove }) => {
  return (
    <TagContainer>
      {tags.map((tag: any) => (
        <TagItem size={size} key={tag} onClick={onClick} onRemove={onRemove}>
          {tag}
        </TagItem>
      ))}
    </TagContainer>
  );
};

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

export default TagList;
