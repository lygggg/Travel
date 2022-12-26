import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Anton } from "@next/font/google";
import { Button } from "src/components/commons";
import { SubTitle } from "src/components/home";

const WELCOME = "블로그에서 나만의 스토리를 공유해 보세요.";

const antonFont = Anton({ weight: "400", subsets: ["latin"] });

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
      <MainTitle className={antonFont.className}>MLOG</MainTitle>
      <SubTitle content={WELCOME} speed={100}></SubTitle>
      <ButtonContainer>
        <Button
          onClick={handleClickWrite}
          variant="primary"
          size="large"
          aria-label="블로그 글 작성하러 가기"
        >
          글 작성하러 가기
        </Button>
        <Button
          onClick={handleClickMe}
          variant="default"
          size="large"
          aria-label="내 블로그 페이지 가기"
        >
          내 블로그가 가기
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  row-gap: 70px;
  flex-direction: column;
  place-items: center;
  width: 100%;
  min-height: 80vh;
  height: 100%;
  justify-content: center;
`;

const MainTitle = styled.h1`
  font-size: 5rem;
  color: ${(props) => props.theme.green[700]};
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
  gap: 40px;
`;

export default Home;
