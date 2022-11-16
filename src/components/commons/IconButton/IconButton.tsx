import styled from "@emotion/styled";

interface IconButtonStyled extends React.HTMLAttributes<HTMLDivElement> {
  width: string;
  height: string;
  position?: string;
}

const IconButton = (props: IconButtonStyled) => {
  return <IconButtonStyled {...props} />;
};
export default IconButton;

const IconButtonStyled = styled.div<IconButtonStyled>`
  background: url("/myblog_sprites.png");
  background-position: ${(props) => props.position};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  cursor: pointer;
  &:hover {
    opacity: 0.3;
  }
`;
