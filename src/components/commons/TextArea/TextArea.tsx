import React, { useRef, useState } from "react";
import styled from "@emotion/styled";

interface TextAreaStyled
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChange: any; // TODO any
  label: string;
}

const TextArea = (props: TextAreaStyled) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [textLength, setTextLength] = useState<number | undefined>(0);

  const handleChange = () => {
    const text = ref.current?.value;
    setTextLength(text?.length);
    props.onChange?.(text);
  };

  return (
    <>
      <Label>
        <LabelText>{props.label && `${props.label}`}</LabelText>
        <TextAreaStyled
          {...props}
          ref={ref}
          value={props.value}
          onChange={handleChange}
          data-testid="textarea"
        />
        <TextLength data-testid="textarea-length">
          {props.maxLength && `${textLength}/${props.maxLength}`}
        </TextLength>
      </Label>
    </>
  );
};
export default TextArea;

const TextAreaStyled = styled.textarea<TextAreaStyled>`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: ${(props) => props.theme.black[500]};
  color: ${(props) => props.theme.white};
  outline: none;
  resize: none;
`;

const TextLength = styled.div`
  text-align: end;
`;

const Label = styled.label`
  flex-direction: column;
  display: flex;
  gap: 1rem;
`;

const LabelText = styled.span`
  font-size: 1.5rem;
`;
