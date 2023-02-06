import styled from "@emotion/styled";
import { Noto_Sans_KR } from "@next/font/google";
import { useTyping } from "src/hooks/useTyping";

interface Props {
  content: string;
  speed: number;
}

const Font = Noto_Sans_KR({
  weight: "400",
});

const MainTitle: React.FC<Props> = ({ content, speed }) => {
  const text = useTyping({ content, speed });

  return (
    <Container className={Font.className}>
      <h1>{text}</h1>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  font-size: 2.3rem;
  height: 100px;
  line-height: 1.3;
`;

export default MainTitle;
