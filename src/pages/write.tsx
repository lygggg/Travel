import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { EditorContainer } from "src/components/editor";
import { modals } from "src/components/commons/Modal/GlobalModal";
import { useModalActions } from "src/contexts/modalContext";

const Write: NextPage = () => {
  const { data: session } = useSession();
  const modalDispatch = useModalActions();

  if (!session?.isAdmin) {
    modalDispatch?.({ type: "open", component: modals.NOAUTH_MODAL });
  }

  return <EditorContainer />;
};

export default Write;
