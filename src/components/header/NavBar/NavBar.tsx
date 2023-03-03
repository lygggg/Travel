import { useState } from "react";
import styled from "@emotion/styled";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Aboreto } from "@next/font/google";
import { Button, IconButton } from "src/components/commons";
import { modals } from "src/components/commons/Modal/GlobalModal";
import { useModalActions } from "src/contexts/modalContext";
import { MenuDropdown, CategoryList } from "../index";

const aboretoFont = Aboreto({ weight: "400" });

const NavBar = () => {
  const [selected, setSelected] = useState("");
  const { data: session } = useSession();
  const modalDispatch = useModalActions();

  const handleModalOpen = () =>
    modalDispatch?.({ type: "open", component: modals.LOGIN_MODAL });

  const menus = [{ title: "새 글 작성", url: "/write" }];
  const categorys = [
    { title: "Articles", url: "/articles" },
    { title: "About", url: "/about" },
    { title: "Blog", url: "/" },
  ];

  return (
    <>
      <HeaderContainer>
        <HeaderLayout>
          <HeaderLeftContainer>
            <Title>
              <TitleLink
                onClick={() => setSelected("home")}
                className={aboretoFont.className}
                href={"/"}
              >
                Travel
              </TitleLink>
            </Title>
          </HeaderLeftContainer>
          <HeaderCenterContainer>
            <CategoryList
              onSelected={setSelected}
              selected={selected}
              categorys={categorys}
            />
          </HeaderCenterContainer>
          <HeaderRightContainer>
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

const HeaderContainer = styled.nav`
  background-color: ${(props) => props.theme.gray[900]};
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
  gap: 80px;
  font-size: 1.1rem;
`;

const HeaderLeftContainer = styled.div`
  display: flex;
  gap: 20px;
  cursor: pointer;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 800;
  font-size: 1.8rem;
`;

const TitleLink = styled(Link)`
  color: ${(props) => props.theme.white};
`;

export default NavBar;
