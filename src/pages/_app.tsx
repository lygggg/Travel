import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { HeaderBar } from "src/components/header";
import { GlobalStyle, theme } from "src/styles/globalStyle";
import { ThemeProvider } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as gtag from "src/libs/gtag";
import { HeadMeta } from "src/components/commons";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as gtag from "src/libs/gtag";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
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
