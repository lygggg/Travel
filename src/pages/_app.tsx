import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { HeaderBar } from "src/components/header";
import { GlobalStyle, theme } from "src/styles/globalStyle";
import { ThemeProvider } from "@emotion/react";
import { HeadMeta } from "src/components/commons";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Script from "next/script";
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
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${gtag.GA_TRACKING_ID}, {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      <SessionProvider session={pageProps.session}>
        <HeadMeta />
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <HeaderBar />
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
