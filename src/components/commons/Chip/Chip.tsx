import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Image from "next/image";
import closeImg from "/public/close.png"; // TODO image sprite로 바꿀예정

export interface Props {
  children: string;
  size?: "mini" | "small" | "medium" | "large";
  onClick?: (chip: string) => void;
  onRemove?: (chip: string) => void;
}

const Chip: React.FC<Props> = ({
  children,
  onClick,
  onRemove,
  size = "mini",
  ...rest
}) => {
  const handleRemove = () => {
    onRemove?.(children);
  };

  const handleClick = () => {
    onClick?.(children);
  };
  return (
    <>
      <ChipStyle {...rest} aria-label={children} size={size}>
        <TextContainer
          clickable={onClick}
          onClick={handleClick}
          aria-label={`${children} tag`}
        >
          {children}
        </TextContainer>
        {onRemove && (
          <ImageContainer>
            <Image
              src={closeImg}
              alt="태그 삭제하기"
              width={20}
              height={20}
              onClick={handleRemove}
            />
          </ImageContainer>
        )}
      </ChipStyle>
    </>
  );
};

const ChipStyle = styled.li<{ size: string }>`
  display: flex;
  color: ${(props) => props.theme.white};
  font-weight: 500;
  padding: 0.25rem;
  background-color: ${(props) => props.theme.green[700]};
  border-radius: 2rem;
  ${(props) => {
    switch (props.size) {
      case "mini":
        return css`
          font-size: 1rem;
        `;
      case "small":
        return css`
          padding: 0.4rem;
          font-size: 1.2rem;
        `;
      case "medium":
        return css`
          padding: 0.5rem;
          font-size: 1.7rem;
        `;
      case "large":
        return css`
          font-size: 2rem;
          padding: 0.7rem;
        `;
    }
  }}
`;

const TextContainer = styled.div<{ clickable?: (chip: string) => void }>`
  ${(props) =>
    props.clickable &&
    `&:hover {
    opacity: 0.5;
    cursor: pointer;
  }`}
`;
const ImageContainer = styled.span`
  display: flex;
  align-items: center;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

export default Chip;
