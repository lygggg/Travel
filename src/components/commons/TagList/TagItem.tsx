import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Image from "next/image";
import closeImg from "/public/close.png"; // TODO image sprite로 바꿀예정

export interface Props {
  children: string;
  size: "mini" | "small" | "medium" | "large";
  onClick?: (tag: string) => void;
  onRemove?: (tag: string) => void;
}

const TagItem: React.FC<Props> = ({
  children,
  onClick,
  onRemove,
  ...props
}) => {
  const handleRemove = () => {
    onRemove?.(children);
  };

  const handleClick = () => {
    onClick?.(children);
  };
  return (
    <>
      <TagStyle data-testid="tag-item" {...props}>
        <TextContainer clickable={onClick} onClick={handleClick}>
          {children}
        </TextContainer>
        {onRemove && (
          <ImageContainer>
            <Image
              src={closeImg}
              alt="removeTag"
              width={20}
              height={20}
              onClick={handleRemove}
            />
          </ImageContainer>
        )}
      </TagStyle>
    </>
  );
};

const TagStyle = styled.div<{ size: string }>`
  display: flex;
  color: ${(props) => props.theme.white};
  font-weight: 500;
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

const TextContainer = styled.span<{ clickable?: (tag: string) => void }>`
  ${(props) =>
    props.clickable &&
    `&:hover {
    opacity: 0.5;
    cursor: pointer;
  }`}
`;
const ImageContainer = styled.span`
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

export default TagItem;
