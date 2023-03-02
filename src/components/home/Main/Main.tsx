import styled from "@emotion/styled";
import { Noto_Sans_KR } from "@next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "src/components/commons";
import { MainTitle } from "../index";

const WELCOME = "반갑습니다. 제 이름은 이영규입니다.";
const sansFont = Noto_Sans_KR({ weight: "300" });

const Main = () => {
  return (
    <Container>
      <TitleContainer>
        <FirstTitle className={sansFont.className}>
          생각을 끄적이는 블로그입니다.
        </FirstTitle>
        <MainTitle content={WELCOME} speed={100}></MainTitle>
        <SubTitle className={sansFont.className}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          maximus congue diam sit amet tempus. Sed Sodales ligula. in sodales
        </SubTitle>
        <Link href={"/about"}>
          <ReadMoreButton variant="primary" aria-label="read more">
            READ MORE
          </ReadMoreButton>
        </Link>
      </TitleContainer>
      <ImageContainer>
        <Image
          priority={true}
          src="https://mlog-lygggg.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/f5ee32f1-048f-4a18-8664-4b53dba6f646/road-gc79f590a9_1920.jpg"
          fill
          alt=""
          style={{ objectFit: "cover" }}
        />
      </ImageContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 3rem;
  flex-direction: row;
  width: 100%;
  min-height: 80vh;
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem;
  width: 50%;
  height: 650px;
`;

const TitleContainer = styled.div`
  display: flex;
  margin-top: 100px;
  flex-flow: column;
  gap: 40px;
  width: 50%;
  height: 400px;
`;

const ReadMoreButton = styled(Button)`
  width: 140px;
  height: 55px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 8px;
`;

const SubTitle = styled.h2`
  font-size: 1.1rem;
  line-height: 1.9;
  color: darkgray;
  font-weight: bold;
`;

const FirstTitle = styled.h3`
  font-weight: bold;
`;

export default Main;
