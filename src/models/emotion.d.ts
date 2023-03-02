import "@emotion/styled";
import "@emotion/react";

interface Palette {
  50?: Color;
  100?: Color;
  200?: Color;
  300?: Color;
  400?: Color;
  500?: Color;
  600?: Color;
  700?: Color;
  800?: Color;
  900?: Color;
}

type ExtendedTheme = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends ExtendedTheme {
    primary: Palette;
    red: Palette;
    orange: Palette;
    yellow: Palette;
    green: Palette;
    blue: Palette;
    purple: Palette;
    black: Palette;
    gray: Palette;
    white: Color;
  }
}
