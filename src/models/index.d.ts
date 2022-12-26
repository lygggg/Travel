import gtag from "@types/gtag.js";

declare global {
  interface Window {
    gtag: gtag;
  }
}
