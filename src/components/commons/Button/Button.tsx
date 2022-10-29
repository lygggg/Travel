import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

export interface ButtonStyled
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | number;
  fontSize?: string;
  variant: "default" | "primary" | "secondary" | "tertiary";
  rounded: "default" | "round";
  size: "mini" | "small" | "medium" | "large";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ children, ...rest }: ButtonStyled) => {
  return <ButtonStyled {...rest}>{children}</ButtonStyled>;
};
export default Button;

const ButtonStyled = styled.button<ButtonStyled>`
  border: none;
  font-size: ${(rest) => rest.fontSize || "15px"};
  font-weight: bold;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
  ${(props) => {
    switch (props.variant) {
      case "primary":
        return css`
          background-color: ${props.theme.gray[500]};
          color: ${props.theme.white};
        `;
      case "secondary":
        return css`
          background-color: ${props.theme.black[500]};
          color: ${props.theme.white};
        `;
      case "tertiary":
        return css`
          background-color: ${props.theme.purple[500]};
          color: ${props.theme.white};
        `;
      default:
        return css`
          background-color: ${props.theme.white};
          color: ${props.theme.black[500]};
        `;
    }
  }}
  ${(props) => {
    switch (props.size) {
      case "mini":
        return css`
          padding: 0 0.5rem;
        `;
      case "small":
        return css`
          padding: 0.25rem 0.5rem;
        `;
      case "medium":
        return css`
          padding: 0.625rem 0.875rem;
        `;
      case "large":
        return css`
          padding: 0.75rem 1rem;
          font-size: 1.25rem;
          font-weight: 700;
        `;
    }
  }}
    ${(props) => {
    switch (props.rounded) {
      case "round":
        return css`
          border-radius: 2rem;
        `;
      default:
        return css`
          border-radius: 0.3rem;
        `;
    }
  }};
`;
