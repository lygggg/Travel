import styled from "@emotion/styled";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "src/components/commons";

const HeaderBar = () => {
  const { data: session, status } = useSession();
  const { name } = session?.user;

  return (
    <HeaderContainer>
      <HeaderLeftContainer>
        <Span>HOME</Span>
        <Span>{name}</Span>
      </HeaderLeftContainer>
      <HeaderRightContainer>
        <Span>다크모드</Span>
        <Span>검색</Span>
        {session ? (
          <Span>
            <Button width="80px" height="40px" onClick={() => signOut()}>
              로그아웃
            </Button>
            <Link href={`/write`}>글 작성하기</Link>
          </Span>
        ) : (
          <Button width="50px" height="30px" onClick={() => signIn()}>
            로그인
          </Button>
        )}
      </HeaderRightContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: black;
  width: 100%;
  padding: 10px 12px 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HeaderRightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Span = styled.span`
  color: white;
`;

const HeaderLeftContainer = styled.div`
  display: flex;
  gap: 20px;
`;
export default HeaderBar;
