import React, { ReactElement, ReactNode } from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { RouterContext } from "next/dist/shared/lib/router-context";

import { createMockRouter } from "__mocks__/createMockRouter";
import { theme } from "src/styles/globalStyle";
import { queryClient } from "src/test-utils/ReactQueryWrapper";

interface Props {
  children: ReactNode;
}

const defaultQueryClient = queryClient;
const defaultTheme = theme;
const defaultRouter = createMockRouter({});

const customRender = (
  ui: ReactElement,
  {
    theme = defaultTheme,
    router = defaultRouter,
    queryClient = defaultQueryClient,
    ...renderOptions
  },
) => {
  function Wrapper({ children }: Props) {
    return (
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <RouterContext.Provider value={router}>
              {children}
            </RouterContext.Provider>
          </QueryClientProvider>
        </RecoilRoot>
      </ThemeProvider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";

// override render method
export { customRender as render };
