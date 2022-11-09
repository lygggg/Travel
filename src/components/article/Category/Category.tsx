import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { TagList } from "src/components/commons";

interface Props {
  tags: any;
}

const Category: React.FC<Props> = ({ tags }) => {
  const router = useRouter();
  const moveUrl = (tag: string) => {
    router.push({
      pathname: router.query.userId as string,
      query: { tag },
    });
  };
  return (
    <Container>
      <TagList tags={tags} size="mini" onClick={moveUrl} />
    </Container>
  );
};

const Container = styled.div`
  width: 768px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  gap: 0.6rem;
`;

export default Category;
