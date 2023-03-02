import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { Chip } from "src/components/commons";
import { convertToForceArray, checkInArr, isArray } from "src/utils/array";
import { searchFilterAndExecute } from "src/utils/params";
export interface Props {
  tags: string[];
}

const ArticleTagList: React.FC<Props> = ({ tags }) => {
  const router = useRouter();

  const moveUrl = (tag: string) => {
    const urlParams = searchFilterAndExecute(tag, "tags");

    router.push({
      pathname: router.pathname,
      search: urlParams.toString(),
    });
  };

  const checkSelected = (arr: string[], value: string) => {
    return checkInArr(arr, value);
  };

  return (
    <Container data-testid="article-taglist">
      <TagContainer>
        {tags.map((tag: string) => (
          <Chip
            size="small"
            key={tag}
            onClick={moveUrl}
            selected={checkSelected(
              convertToForceArray(router.query.tags),
              tag,
            )}
            data-testid="article-tag"
          >
            {tag}
          </Chip>
        ))}
      </TagContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
`;

const TagContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

export default ArticleTagList;
