import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "src/components/commons";
import { TextBox } from "src/components/home";

const WELCOME = "블로그에서 나만의 스토리를 공유해 보세요.";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { push } = useRouter();

  const handleClickWrite = () => {
    if (!session) return;
    push("/write");
  };

  const handleClickMe = () => {
    if (!session) return;
    push(`/${session?.user.email}`);
  };

  return (
    <Container>
      <Title>MLOG</Title>
      <TextBox content={WELCOME} speed={100}></TextBox>
      <ButtonContainer>
        <Button onClick={handleClickWrite} variant="primary" size="large">
          글 작성하러 가기
        </Button>
        <Button onClick={handleClickMe} variant="default" size="large">
          내 블로그가 가기
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  row-gap: 4rem;
  flex-direction: column;
  place-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 5rem;
  @keyframes fadein {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

export default Home;
