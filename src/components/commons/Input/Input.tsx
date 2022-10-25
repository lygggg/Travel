import React, { useRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface InputStyled extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: "default" | "primary" | "secondary" | "tertiary";
  rounded: "default" | "round";
  fontSize: "mini" | "small" | "medium" | "large";
}

const Input = (props: InputStyled) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return <InputStyled {...props} ref={inputRef} />;
};
export default Input;

const InputStyled = styled.input<InputStyled>`
  width: 100%;
  border: none;
  outline: none;
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
          background-color: transparent;
          color: ${props.theme.white};
        `;
    }
  }}

  ${(props) => {
    switch (props.fontSize) {
      case "mini":
        return css`
          font-size: 0.5rem;
        `;
      case "small":
        return css`
          font-size: 1.3rem;
        `;
      case "medium":
        return css`
          font-size: 2rem;
        `;
      case "large":
        return css`
          font-size: 2.5rem;
        `;
    }
  }};

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
