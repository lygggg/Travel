import { useState, useEffect, KeyboardEvent } from "react";
import { Input } from "src/components/commons";
import styled from "@emotion/styled";

interface Props {
  onChange: (tags: string[]) => void;
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

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !e.currentTarget.value) {
      setTags((tags) => tags.slice(0, tags.length - 1));
    }
  };

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !tags.includes(tag)) {
      setTags((tags) => [...tags, tag]);
      setTag("");
      e.preventDefault();
    }
  };

  return (
    <Container>
      <Input
        type="text"
        aria-label="tag-input"
        placeholder="태그를 입력해주세요"
        variant="default"
        rounded="default"
        fontSize="small"
        onChange={(e) => setTag(e.target.value)}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        value={tag}
      />
      {tags &&
        tags.map((tag) => (
          <Tag key={tag} onClick={() => onRemove(tag)}>
            {tag}
          </Tag>
        ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
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
