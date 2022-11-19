import { useState } from "react";

const useModal = (initialMode = false) => {
  const [modalOpen, setModalOpen] = useState(initialMode);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return [openModal, closeModal, modalOpen] as const;
};

export default useModal;
