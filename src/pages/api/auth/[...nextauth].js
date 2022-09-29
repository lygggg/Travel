import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_ID,
      clientSecret: process.env.KAKAO_SECRET,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  callback: {
    async session(session, token) {
      const encodedToken = jwt.sign(token, process, process.env.SECRET, {
        algorithm: "HS256",
      });
      session.id = token.id;
      session.token = encodedToken;
      return Promise.resolve(session);
    },
    async jwt(token, user) {
      const isUserSignedIn = user ? true : false;

      if (isUserSignedIn) {
        token.id = user.id.toString();
      }
      return Promise.resolve(token);
    },
  },
};
export default NextAuth(authOptions);
