import { useEffect, useState } from "react";

interface Props {
  content: string;
  speed: number;
}

export const useTyping = ({ content = "", speed = 100 }: Props) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= content.length) return;
    const key = setInterval(() => {
      setText(text + content[index]);
      setIndex(() => {
        clearInterval(key);
        return index + 1;
      });
    }, speed);
  }, [index]);

  return text;
};
