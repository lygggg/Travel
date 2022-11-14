import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Auth = ({ children }: any) => {
  const router = useRouter();
  const { data: session, status } = useSession({ required: true });
  const isUser = !!session?.user;
  const loading = status === "loading";

  useEffect(() => {
    if (!loading && !isUser) {
      router.push("/");
    }
  }, [isUser, loading]);

  if (loading || !isUser) {
    return null;
  }
  return children;
};

export default Auth;
