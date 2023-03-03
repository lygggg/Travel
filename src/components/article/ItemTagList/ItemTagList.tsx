import styled from "@emotion/styled";
import { Chip } from "src/components/commons";

export interface Props {
  tags: string[];
}

const ItemTagList: React.FC<Props> = ({ tags }) => {
  return (
    <TagLayout>
      {tags.map((tag: string) => (
        <Chip size="mini" key={tag} data-testid="article-tag">
          {tag}
        </Chip>
      ))}
    </TagLayout>
  );
};

const TagLayout = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

export default ItemTagList;
