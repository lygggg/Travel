import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "src/components/commons";

const HeaderBox = () => {
  const { data: session, status } = useSession();
  return (
    <>
      {session ? (
        <div>
          <Button width="50px" height="30px" onClick={() => signOut()}>
            로그아웃
          </Button>
          <Link href={`/write`}>글 작성하기</Link>
        </div>
      ) : (
        <Button width="50px" height="30px" onClick={() => signIn()}>
          로그인
        </Button>
      )}
    </>
  );
};

export default HeaderBox;
