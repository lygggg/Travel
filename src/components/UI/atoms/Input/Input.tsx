import React, { useRef } from "react";
import styled from "@emotion/styled";

interface InputStyled extends React.InputHTMLAttributes<HTMLInputElement> {
  width: string;
  height: string;
  borderRadius?: string;
}

const Input = (props: InputStyled) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return <InputStyled {...props} ref={inputRef} />;
};
export default Input;

const InputStyled = styled.input<InputStyled>``;
