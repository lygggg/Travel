import styled from "@emotion/styled";
import { useSession, signIn } from "next-auth/react";
import { Button, IconButton } from "src/components/commons";
import { MenuDropdown } from "../index";

const HeaderBar = () => {
  const { data: session } = useSession();

  return (
    <HeaderContainer>
      <HeaderLayout>
        <HeaderLeftContainer>
          <Span>HOME</Span>
          {session && <Span>{session.user.name}</Span>}
        </HeaderLeftContainer>
        <HeaderRightContainer>
          <IconButton width="30px" height="30px" position="-110px -10px" />
          <IconButton width="30px" height="30px" position="-10px -10px" />

          {session ? (
            <MenuDropdown />
          ) : (
            <Button width="70px" height="40px" onClick={() => signIn()}>
              로그인
            </Button>
          )}
        </HeaderRightContainer>
      </HeaderLayout>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
  z-index: 100;
  position: sticky;
  backdrop-filter: blur(30px);
`;

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 100%;
  width: 100%;
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