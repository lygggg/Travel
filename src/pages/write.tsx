import type { NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import { Editor } from "../components/templates";

const Write: NextPage = () => {
  const { data: session } = useSession();
  const isUser = !!session?.user;
  if (!isUser) {
    signIn();
  }
  return (
    <>
      <Editor />
    </>
  );
};

export default Write;
