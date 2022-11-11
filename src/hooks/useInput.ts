import { useState, ChangeEventHandler } from "react";

const useInput = (initialValue = "") => {
  const [text, setText] = useState(initialValue);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };

  return [text, onChange, setText];
};

export default useInput;
