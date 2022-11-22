import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { HeaderBar } from "src/components/header";
import { Auth } from "src/components/login";
import { GlobalStyle, theme } from "src/styles/globalStyle";
import { ThemeProvider } from "@emotion/react";
import { HeadMeta } from "src/components/commons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  DehydratedState,
} from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import Script from "next/script";
import * as gtag from "src/libs/gtag";
import { NextComponentType } from "next";
import styled from "@emotion/styled";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { needAuth?: boolean };
  session: Session;
  dehydratedState: DehydratedState;
};

function MyApp({ Component, pageProps }: CustomAppProps) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());

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
          gtag('config', "${gtag.GA_TRACKING_ID}", {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <SessionProvider session={pageProps.session}>
              <HeadMeta />
              <ThemeProvider theme={theme}>
                <GlobalStyle />
                <HeaderBar />
                <Container location={router.pathname}>
                  {Component?.needAuth ? (
                    <Auth>
                      <Component {...pageProps} />
                    </Auth>
                  ) : (
                    <Component {...pageProps} />
                  )}
                </Container>
              </ThemeProvider>
            </SessionProvider>
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

interface StyleProps {
  location: string;
}

const Container = styled.div<StyleProps>`
  margin: 0 auto;
  height: calc(100vh - 90px);
  box-sizing: border-box;
  position: relative;
  width: 1200px;
`;

export default MyApp;
