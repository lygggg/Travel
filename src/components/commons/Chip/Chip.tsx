import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Image from "next/image";
import closeImg from "/public/close.png"; // TODO image sprite로 바꿀예정

export interface Props {
  children: string;
  size?: "mini" | "small" | "medium" | "large";
  onClick?: (chip: string) => void;
  selected?: boolean;
  onRemove?: (chip: string) => void;
}

const Chip: React.FC<Props> = ({
  children,
  onClick,
  onRemove,
  selected,
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
    <ChipStyle
      onClick={handleClick}
      clickable={onClick}
      selected={selected}
      {...rest}
      aria-label={children}
      size={size}
    >
      <TextContainer aria-label={`${children} tag`}>{children}</TextContainer>
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
  );
};

interface StyleProps {
  selected?: boolean;
  size: string;
  clickable?: (chip: string) => void;
}

const ChipStyle = styled.li<StyleProps>`
  display: flex;
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0.25rem;
  background-color: ${(props) => props.theme.gray[700]};
  border: 1px solid ${(props) => props.theme.gray[600]};
  border-radius: 1.2rem;
  transition: "box-shadow 0.3s ease-in-out";
  box-shadow: ${(props) =>
    props.selected && props.clickable && "0px 0px 0px 5px blue"};
  ${(props) =>
    props.clickable &&
    `&:hover {
    box-shadow: 0px 0px 0px 5px white;
    cursor: pointer;
  }
  `}
  ${(props) => {
    switch (props.size) {
      case "mini":
        return css`
          padding: 10px 16px !important;
          font-size: 1rem;
          background-color: ${props.theme.black[700]};
          border: none;
        `;
      case "small":
        return css`
          padding: 9px 20px !important;
          font-size: 1.1rem;
        `;
      case "medium":
        return css`
          padding: 9px 22px !important;
          font-size: 1.7rem;
        `;
      case "large":
        return css`
          font-size: 9px 22px !important;
          padding: 0.7rem;
        `;
    }
  }};
`;

const TextContainer = styled.div``;
const ImageContainer = styled.span`
  display: flex;
  align-items: center;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

export default Chip;
