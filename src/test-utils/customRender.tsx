import React, { ReactElement, ReactNode } from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot, MutableSnapshot } from "recoil";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { articleState } from "src/store/article";
import { createMockRouter } from "__mocks__/createMockRouter";
import { theme } from "src/styles/globalStyle";
import { queryClient } from "src/test-utils/ReactQueryWrapper";

interface Props {
  children: ReactNode;
}

const defaultQueryClient = queryClient;
const defaultTheme = theme;
const defaultRouter = createMockRouter({
  query: { userId: "baayoo93@gmail.com", id: "idfsdfds" },
  push: jest.fn(),
});

const defaultRecoilState = ({ set }: MutableSnapshot) => {
  set(articleState, {
    content: "",
    tags: [],
    title: "제목",
    thumbnailUrl: "",
    introduction: "",
    syncTime: "",
  });
};

const customRender = (
  ui: ReactElement,
  {
    initializeState = defaultRecoilState,
    theme = defaultTheme,
    router = defaultRouter,
    queryClient = defaultQueryClient,
    ...renderOptions
  },
) => {
  function Wrapper({ children }: Props) {
    return (
      <ThemeProvider theme={theme}>
        <RecoilRoot initializeState={initializeState}>
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
