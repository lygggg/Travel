import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";

export interface Props {
  children: ReactNode;
  isActive: boolean;
}
const Modal = (props: Props) => {
  if (typeof document == "undefined") return null;

  let modalRoot = document.getElementById("portal");

  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    document.body.appendChild(modalRoot);
  }

  if (!props.isActive) return null;

  return createPortal(
    <Overlay data-testid="modal">{props.children}</Overlay>,
    modalRoot,
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
