import { useRef, useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";

export interface Props {
  children: ReactNode;
  isActive: boolean;
}
const Modal = (props: Props) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLLIElement>("#portal");
    setMounted(true);
  }, []);

  if (!mounted || !ref.current) {
    return null;
  }

  if (!props.isActive) return null;

  return createPortal(
    <Overlay data-testid="modal">{props.children}</Overlay>,
    ref.current,
  );
};

export default Modal;

const Overlay = styled.div`
  z-index: 120;
  position: fixed;
  display: flex;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
`;
