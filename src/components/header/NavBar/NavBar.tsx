import styled from "@emotion/styled";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Aboreto } from "@next/font/google";
import { Button, IconButton } from "src/components/commons";
import { modals } from "src/components/commons/Modal/GlobalModal";
import { useModalActions } from "src/contexts/modalContext";
import { MenuDropdown } from "../index";

const aboretoFont = Aboreto({ weight: "400" });

const NavBar = () => {
  const { data: session } = useSession();
  const modalDispatch = useModalActions();

  const handleModalOpen = () =>
    modalDispatch?.({ type: "open", component: modals.LOGIN_MODAL });

  const menus = [{ title: "새 글 작성", url: "/write" }];

  return (
    <>
      <HeaderContainer>
        <HeaderLayout>
          <HeaderLeftContainer>
            <Title>
              <h1>
                <TitleLink className={aboretoFont.className} href={"/"}>
                  MLOG
                </TitleLink>
              </h1>
            </Title>
          </HeaderLeftContainer>
          <HeaderCenterContainer>
            <MenuLink href={"/"}>Home</MenuLink>
            <MenuLink href={"/articles"}>Posts</MenuLink>
            <MenuLink href={"/articles"}>Tags</MenuLink>
            <MenuLink href={"/articles"}>About</MenuLink>
          </HeaderCenterContainer>
          <HeaderRightContainer>
            {" "}
            {/* <IconButton
              width="30px"
              height="30px"
              position="-110px -10px"
              aria-label="검색하기"
            /> */}
            {/* <IconButton
              width="30px"
              height="30px"
              position="-10px -10px"
              aria-label="다크모드로 변환하기"
            /> */}
            {session ? (
              <MenuDropdown
                items={menus}
                trigger={
                  <IconButton
                    data-testid="nav-menu-dropdown"
                    width="30px"
                    height="30px"
                    position="-10px -110px"
                  />
                }
              />
            ) : (
              <Button
                variant="primary"
                size="medium"
                rounded={true}
                onClick={handleModalOpen}
                data-testid="login-button"
              >
                로그인
              </Button>
            )}
          </HeaderRightContainer>
        </HeaderLayout>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.header`
  background-color: rgba(100, 100, 100, 0.5);
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 65px;
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
  margin: 0 auto;
  width: 1200px;
`;
const HeaderRightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const HeaderCenterContainer = styled.div`
  display: flex;
  gap: 50px;
  font-size: 1.1rem;
`;

const HeaderLeftContainer = styled.div`
  display: flex;
  gap: 20px;
  cursor: pointer;
  align-items: center;
`;

const Title = styled.span`
  font-weight: 800;
  font-size: 1.8rem;
`;

const TitleLink = styled(Link)`
  color: ${(props) => props.theme.green[700]};
`;

const MenuLink = styled(Link)`
  color: ${(props) => props.theme.gray[300]};
`;

export default NavBar;
