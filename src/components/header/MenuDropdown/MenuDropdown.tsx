import { useRef } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { IconButton } from "src/components/commons";
import { signOut, useSession } from "next-auth/react";
import { useDetectOutsideClick } from "src/hooks";

const MenuDropdown = () => {
  const dropdownRef = useRef<HTMLElement>(null);
  const { data: session } = useSession();
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const menus = [
    { title: "새 글 작성", url: "/write" },
    { title: "내 블로그 가기", url: `/${session?.user.email}` },
  ];

  return (
    <MenuContainer data-testid="nav-menu-dropdown">
      <span ref={dropdownRef}>
        <IconButton
          width="30px"
          height="30px"
          position="-10px -107px"
          onClick={setIsActive}
        />
      </span>

      <Nav onClick={setIsActive} isActive={isActive}>
        <Ul>
          {menus.map((item) => (
            <div key={item.title}>
              <Link href={item.url}>
                <Li>{item.title}</Li>
              </Link>
            </div>
          ))}
          <Li onClick={() => signOut()}>로그아웃</Li>
        </Ul>
      </Nav>
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  position: relative;
`;

const Nav = styled.nav<{ isActive: boolean }>`
  background: ${(props) => props.theme.black[400]};
  border-radius: 2px;
  position: absolute;
  top: 60px;
  right: 0;
  width: 160px;
  text-align: center;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  padding: 10px;
  z-index: 99;
  opacity: ${(props) => props.isActive && 1};
  visibility: ${(props) => props.isActive && "visible"};
  transform: ${(props) => props.isActive && "translateY(0)"};
  cursor: pointer;
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const Li = styled.li`
  text-decoration: none;
  padding: 15px 20px;
  display: block;
  font-weight: 700;
  color: ${(props) => props.theme.gray[200]};

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: ${(props) => props.theme.green[700]};
  }
`;

export default MenuDropdown;
