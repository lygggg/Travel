import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";

export interface ModalProps {
  children: ReactNode;
  isActive?: boolean;
  closeModal?: () => void;
}

interface ModalPortalProps {
  children: ReactNode;
  isActive?: boolean;
}

const ModalPortal = ({ children, isActive }: ModalPortalProps) => {
  if (typeof document == "undefined") return null;

  let modalRoot = document.getElementById("portal");

  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    document.body.appendChild(modalRoot);
  }

  if (!isActive) return null;

  return createPortal(children, modalRoot);
};

const Modal = ({ children, isActive }: ModalProps) => {
  return (
    <ModalPortal isActive={isActive}>
      <Overlay>{children}</Overlay>
    </ModalPortal>
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
