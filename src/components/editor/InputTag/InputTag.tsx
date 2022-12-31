import { useState, useEffect, KeyboardEvent } from "react";
import styled from "@emotion/styled";
import { Input, Chip } from "src/components/commons";

interface Props {
  onChange: (tags: string[]) => void;
  tagList?: string[];
}

const InputTag: React.FC<Props> = ({ onChange, tagList }) => {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>(tagList || []);

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
        placeholder="태그를 입력후 엔터를 눌러주세요"
        variant="default"
        rounded="default"
        fontSize="small"
        data-testid="editor-tag-input"
        onChange={(e) => setTag(e.target.value)}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        value={tag}
      />
      <TagContainer>
        {tags.map((tag: string) => (
          <Chip size="small" key={tag} onRemove={onRemove}>
            {tag}
          </Chip>
        ))}
      </TagContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
`;

const TagContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

export default InputTag;
