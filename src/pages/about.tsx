import styled from "@emotion/styled";
import type { NextPage } from "next";
import Image from "next/image";
import profile from "../../public/profile.png";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";

const About: NextPage = () => {
  return (
    <Container>
      <Image
        src={profile}
        width={200}
        height={200}
        alt="profile image"
        style={{ borderRadius: "50%" }}
      />
      <IconLayout>
        <Link href="https://github.com/lygggg">
          <FaGithub style={{ color: "white" }} />
        </Link>
        <Link href="mailto:baayoo90@gmail.com">
          <MdEmail />
        </Link>
      </IconLayout>
      <div>
        <P>
          반갑습니다. 프론트엔드 개발자가 꿈인 이영규입니다. 제 블로그에
          와주셔서 감사드립니다.
        </P>
        <P>
          저는 대한민국에 살고있는 개발자 취준생입니다. 더 나은설계에 관심이
          많고, 어려운것에 끊임없이 도전하는 것을 좋아합니다. 최근에는 객체지향,
          함수형 프로그래밍에 관심을 가지고 공부하고있습니다. 완벽한 길은 없다고
          생각합니다. 제가 선택한 길을 좀더 옳게 만들 수 있는 개발자가 되고
          싶습니다.
        </P>
        <P>
          기존에 사용하던 블로그가 있었으나, 직접 만든 블로그로 자리를
          옮겼습니다. 제 블로그 첫 목표는 비 개발자도 읽을 수 있는 글을 작성하는
          것입니다(생각보다 어렵네요ㅠㅠ). 이제부터 꾸준히 포스팅해서 여러분들과
          지식을 공유하고싶습니다.
        </P>
      </div>
    </Container>
  );
};

const IconLayout = styled.div`
  display: flex;
  font-size: 1.7rem;
  gap: 12px;
`;
const Container = styled.div`
  display: flex;
  row-gap: 30px;
  flex-direction: column;
  place-items: center;
  min-height: 80vh;
  height: 100%;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
  padding: 30px 25px 50px 25px;
`;

const P = styled.p`
  overflow-wrap: break-word;
  line-height: 1.8;
  font-size: 1.2rem;
  text-indent: 1.1rem;
  margin: 2rem 0;
`;
export default About;
