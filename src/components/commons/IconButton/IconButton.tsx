import styled from "@emotion/styled";

interface IconButtonStyled extends React.HTMLAttributes<HTMLAnchorElement> {
  width: string;
  height: string;
  position?: string;
}

const IconButton = (props: IconButtonStyled) => {
  return <IconButtonStyled {...props} />;
};
export default IconButton;

const IconButtonStyled = styled.a<IconButtonStyled>`
  background: url("/myblog_sprites.png");
  display: inline-block;
  background-position: ${(props) => props.position};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  cursor: pointer;
  &:hover {
    opacity: 0.3;
  }
`;
