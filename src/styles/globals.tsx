import { Global } from "@emotion/react";

const GlobalStyle = () => (
  <Global
    styles={{
      body: {
        backgroundColor: "#252525",
      },
      a: {
        color: "red",
      },
    }}
  />
);

export default GlobalStyle;
