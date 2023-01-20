/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext,
  HTMLAttributes,
  useContext,
  useRef,
} from "react";
import styled from "@emotion/styled";
import { useDetectOutsideClick } from "src/hooks";
import useKeyClick from "src/hooks/useKeyClick";

export interface DropDownContent {
  isActive: boolean;
  setIsActive?: () => void;
}

export const DropDownContext = createContext<DropDownContent>({
  isActive: false,
  setIsActive: () => {},
});

export interface Props extends HTMLAttributes<HTMLLIElement> {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const DropDown = ({ trigger, children }: Props) => {
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive, closeDropdown] = useDetectOutsideClick(
    dropdownRef,
    false,
  );

  useKeyClick({
    events: [
      {
        key: "Escape",
        keyEvent: () => closeDropdown(),
      },
    ],
  });

  return (
    <DropDownContext.Provider value={{ isActive, setIsActive }}>
      <Container>
        <span ref={dropdownRef}>
          <span data-testid="nav-menu-dropdown" onClick={setIsActive}>
            {trigger}
          </span>
        </span>
        {children}
      </Container>
    </DropDownContext.Provider>
  );
};

interface ListProps {
  children: React.ReactNode;
}

const List = ({ children, ...props }: ListProps) => {
  const { isActive } = useContext(DropDownContext);
  return (
    <HiddenContainer data-testid="dropdown-list" isActive={isActive}>
      <Ul {...props}>{children}</Ul>
    </HiddenContainer>
  );
};

interface ItemPorps extends HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

const Item = ({ children, ...props }: ItemPorps) => {
  const { setIsActive } = useContext(DropDownContext);
  return (
    <Li onClick={setIsActive} {...props}>
      {children}
    </Li>
  );
};

DropDown.Item = Item;
DropDown.List = List;

const Container = styled.div`
  position: relative;
  cursor: pointer;
  z-index: 99;
  padding: 10px;
`;

const HiddenContainer = styled.span<{ isActive: boolean }>`
  position: absolute;
  top: 60px;
  right: 0;
  opacity: 0;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  transform: translateY(-20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  opacity: ${(props) => props.isActive && 1};
  visibility: ${(props) => (props.isActive ? "visible" : "hidden")};
  transform: ${(props) => props.isActive && "translateY(0)"};
`;

const Ul = styled.ul`
  background: ${(props) => props.theme.black[400]};
  border-radius: 2px;
  top: 60px;
  right: 0;
  width: 160px;
  text-align: center;
`;

const Li = styled.li`
  text-decoration: none;
  padding: 15px 20px;
  display: block;
  font-weight: 700;
  text-decoration: none !important;
  color: ${(props) => props.theme.gray[200]};
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: ${(props) => props.theme.green[700]};
  }
`;

export default DropDown;
