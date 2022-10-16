import { useState, useEffect, KeyboardEvent } from "react";
import styled from "@emotion/styled";
import { Button, Input } from "src/components/commons";

interface Props {
  onChange: (e: string[]) => void;
}

const InputTag = ({ onChange }: Props) => {
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    onChange(tags);
  }, [tags]);

  const onRemove = (tag: string) => {
    const newTags = tags.filter((e) => e !== tag);
    setTags(newTags);
  };

  const onKeyDown = (
    e: KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    if (e.key === "Backspace" && !e.target.value) {
      setTags((tags) => tags.slice(0, tags.length - 1));
    }
  };

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (["Enter"].indexOf(e.key) == -1) {
      return;
    }

    if (!tags.includes(tag)) {
      setTags((tags) => [...tags, tag]);
      setTag("");
      e.preventDefault();
    }
  };

  return (
    <Container>
      {tags &&
        tags.map((tag) => (
          <Tag key={tag} onClick={() => onRemove(tag)}>
            {tag}
          </Tag>
        ))}
      <Input
        type="text"
        placeholder="태그를 입력해주세요"
        fontSize="1.5rem"
        fontColor="white"
        onChange={(e) => setTag(e.target.value)}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        value={tag}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
`;

const Tag = styled.div`
  color: white;
  padding: 0.25rem;
  cursor: pointer;
  font-size: 1.5rem;
  background-color: black;
  border-radius: 6px;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;
export default InputTag;
