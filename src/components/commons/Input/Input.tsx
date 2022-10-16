import React, { useRef } from "react";
import styled from "@emotion/styled";

interface InputStyled extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  height?: string;
  borderRadius?: string;
  hasBorder?: string;
  inputColor?: string;
  fontColor?: string;
  fontSize?: string;
  fontWeight?: string;
}

const Input = (props: InputStyled) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return <InputStyled {...props} ref={inputRef} />;
};
export default Input;

const InputStyled = styled.input<InputStyled>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.inputColor || "transparent"};
  color: ${(props) => props.fontColor || "black"};
  font-size: ${(props) => props.fontSize || "15px"};
  font-weight: ${(props) => props.fontWeight};
  border: ${(props) => props.hasBorder || "none"};
  border-radius: ${(props) => props.borderRadius || "4px"};
  outline: none;
`;
