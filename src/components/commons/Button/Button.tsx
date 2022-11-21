import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

export interface ButtonStyled
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "tertiary";
  rounded?: boolean;
  size?: "mini" | "small" | "medium" | "large";
}

const Button = ({
  children,
  variant,
  rounded,
  size,
  ...rest
}: ButtonStyled) => {
  return (
    <ButtonStyled variant={variant} rounded={rounded} size={size} {...rest}>
      {children}
    </ButtonStyled>
  );
};
export default Button;

const ButtonStyled = styled.button<ButtonStyled>`
  border: none;
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
      case true:
        return css`
          border-radius: 2rem;
        `;
      case false:
        return css`
          border-radius: 0.3rem;
        `;
    }
  }};
`;
