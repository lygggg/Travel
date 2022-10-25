import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { HeaderBar } from "src/components/header";
import { GlobalStyle, theme } from "src/styles/globalStyle";
import { ThemeProvider } from "@emotion/react";
import { HeadMeta } from "src/components/commons";
function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <HeadMeta />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <HeaderBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
