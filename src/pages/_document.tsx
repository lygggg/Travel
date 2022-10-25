import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { GA_TRACKING_ID } from "src/libs/gtag";

export default function Document() {
  return (
    <Html>
      <Head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${GA_TRACKING_ID}, {
            page_path: window.location.pathname,
          });
        `,
          }}
        />
      </Head>
      <body>
        <Main />
        <div id="portal" />
        <NextScript />
      </body>
    </Html>
  );
}
