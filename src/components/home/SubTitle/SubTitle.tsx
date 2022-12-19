import styled from "@emotion/styled";
import { useTyping } from "src/hooks/useTyping";

interface Props {
  content: string;
  speed: number;
}

const SubTitle: React.FC<Props> = ({ content, speed }) => {
  const text = useTyping({ content, speed });
  return (
    <Container>
      <h1>{text}</h1>
      <Cursor>_</Cursor>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  font-size: 2.7rem;
  font-weight: 600;
`;
const Cursor = styled.h1`
  animation: blink 0.9s infinite;

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default SubTitle;
