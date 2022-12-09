import { ThemeProvider } from "@emotion/react";
import { ReactNode } from "react";
import { theme } from "src/styles/globalStyle";

interface Props {
  children: ReactNode;
}

export const defaultTheme = theme;

const ThemeWrapper = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
