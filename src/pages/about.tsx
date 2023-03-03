import styled from "@emotion/styled";
import type { NextPage } from "next";

const About: NextPage = () => {
  return <Container>준비중입니다.</Container>;
};

const Container = styled.div`
  display: flex;
  row-gap: 70px;
  flex-direction: column;
  place-items: center;
  min-height: 80vh;
  height: 100%;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
  padding: 30px 25px 50px 25px;
`;

export default About;
