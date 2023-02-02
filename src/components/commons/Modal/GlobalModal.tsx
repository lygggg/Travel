import { useCallback } from "react";
import { Modal } from "src/components/commons";
import { UploadModal } from "src/components/editor";
import { LoginModal } from "src/components/login";
import { NoAuthModal } from "src/components/login/NoAuthModal";
import { useModalActions, useModalValue } from "src/contexts/modalContext";

export const modals = {
  CREATE_ARTICLE_MODAL: UploadModal,
  LOGIN_MODAL: LoginModal,
  NOAUTH_MODAL: NoAuthModal,
};
const GlobalModal = () => {
  const state = useModalValue();
  const dispatch = useModalActions();

  const { ModalComponent } = state;
  const onClose = useCallback(() => {
    dispatch?.({ type: "close" });
  }, [state, dispatch]);
  return (
    <Modal isActive={state.isOpen} closeModal={onClose}>
      {ModalComponent && <ModalComponent onClose={onClose} />}
    </Modal>
  );
};

export default GlobalModal;
