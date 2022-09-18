import React from "react";
import styled from "@emotion/styled";

interface ButtonStyled extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | number;
  width: string;
  height: string;
  buttonColor?: string;
  hasBorder?: boolean;
  borderRadius?: string;
  fontColor?: string;
  fontSize?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ children, ...rest }: ButtonStyled) => {
  return <ButtonStyled {...rest}>{children}</ButtonStyled>;
};
export default Button;

const ButtonStyled = styled.button<ButtonStyled>`
  width: ${(rest) => rest.width};
  height: ${(rest) => rest.height};
  background-color: ${(rest) => rest.buttonColor || "white"};
  border: ${(rest) => rest.hasBorder || true};
  border-radius: ${(rest) => rest.borderRadius || "4px"};
  color: ${(rest) => rest.fontColor || "black"};
  font-size: ${(rest) => rest.fontSize || "15px"};
`;
