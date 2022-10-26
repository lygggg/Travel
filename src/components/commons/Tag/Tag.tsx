import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface Props {
  tags: string[];
  size: "mini" | "small" | "medium" | "large";
}

const Tag: React.FC<Props> = ({ tags, size }) => {
  return (
    <>
      <TagList>
        {tags.map((tag: any) => (
          <TagBox size={size} key={tag}>
            {tag}
          </TagBox>
        ))}
      </TagList>
    </>
  );
};

const TagBox = styled.div<{ size: string }>`
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0.25rem;
  background-color: ${(props) => props.theme.gray[400]};
  border-radius: 2rem;
  ${(props) => {
    switch (props.size) {
      case "mini":
        return css`
          font-size: 1rem;
        `;
      case "small":
        return css`
          font-size: 1.3rem;
        `;
      case "medium":
        return css`
          font-size: 1.7rem;
        `;
      case "large":
        return css`
          font-size: 2rem;
        `;
    }
  }}
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

export default Tag;
