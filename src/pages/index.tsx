import styled from "@emotion/styled";
import type { NextPage } from "next";
import { Anton } from "@next/font/google";
import { SubTitle } from "src/components/home";
import { Main } from "src/components/home/Main";

const WELCOME = "안녕하세요 제 블로그에 오신걸 환영합니다.";

const antonFont = Anton({ weight: "400", subsets: ["latin"] });

const Home: NextPage = () => {
  return (
    <Container>
      <Main />
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

export default Home;
