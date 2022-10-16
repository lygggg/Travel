import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { HeaderBar } from "src/components/header";
import GlobalStyle from "src/styles/globals";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <GlobalStyle />
      <HeaderBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
