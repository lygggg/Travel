import { useRef } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Button } from "src/components/commons";
import { signOut } from "next-auth/react";
import { useDetectOutsideClick } from "src/hooks";

const MenuDropdown = () => {
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const menus = [{ title: "글 작성", url: "/write" }];

  return (
    <MenuContainer>
      <Button width="50px" height="50px" onClick={() => setIsActive(!isActive)}>
        {"메뉴"}
      </Button>
      <Nav ref={dropdownRef} isActive={isActive}>
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
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  position: absolute;
  top: 60px;
  right: 0;
  width: 150px;
  text-align: center;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  padding: 10px;
  z-index: 2;
  opacity: ${(props) => props.isActive && 1};
  visibility: ${(props) => props.isActive && "visible"};
  transform: ${(props) => props.isActive && "translateY(0)"};
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const Li = styled.li`
  border-bottom: 1px solid #dddddd;
  text-decoration: none;
  padding: 15px 20px;
  display: block;
`;
export default MenuDropdown;
