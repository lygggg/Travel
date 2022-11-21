import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "src/components/commons";
import { TextBox } from "src/components/home";

const WELCOME = "나만의 블로그를 만들어보세요.";

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
      <TextBox content={WELCOME} speed={100}></TextBox>
      <ButtonContainer>
        <Button
          onClick={handleClickWrite}
          variant="primary"
          size="large"
          rounded="round"
        >
          글 작성하러 가기
        </Button>
        <Button
          onClick={handleClickMe}
          variant="default"
          size="large"
          rounded="round"
        >
          내 블로그가 가기
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  row-gap: 2rem;
  flex-direction: column;
  place-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export default Home;
