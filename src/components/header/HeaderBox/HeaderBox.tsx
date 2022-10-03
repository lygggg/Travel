import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "src/components/commons";

const HeaderBox = () => {
  const { data: session, status } = useSession();
  return (
    <>
      {session ? (
        <Button width="50px" height="30px" onClick={() => signOut()}>
          로그아웃
        </Button>
      ) : (
        <Button width="50px" height="30px" onClick={() => signIn()}>
          로그인
        </Button>
      )}
    </>
  );
};

export default HeaderBox;
