import Link from "next/link";
import { signOut } from "next-auth/react";
import styled from "@emotion/styled";
import { DropDown } from "src/components/commons/DropDown";

export interface Props {
  items: { title: string; url: string }[];
  trigger: React.ReactNode;
}

const MenuDropdown: React.FC<Props> = ({ items, trigger }) => {
  return (
    <DropDown trigger={trigger}>
      <DropDown.List>
        <DropDown.Item onClick={() => signOut()}>로그아웃</DropDown.Item>
        {items.map((item) => (
          <DropDown.Item key={item.title}>
            <StyledLink href={item.url}>{item.title}</StyledLink>
          </DropDown.Item>
        ))}
      </DropDown.List>
    </DropDown>
  );
};

const StyledLink = styled(Link)`
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: ${(props) => props.theme.green[700]};
  }
`;

export default MenuDropdown;
