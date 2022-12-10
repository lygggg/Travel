import React, { ReactElement, ReactNode } from "react";
import { render } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "__mocks__/createMockRouter";
import ReactQueryWrapper, { defaultQueryClient } from "./ReactQueryWrapper";
import ThemeWrapper, { defaultTheme } from "./ThemeWrapper";

interface Props {
  children: ReactNode;
}

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
      <ThemeWrapper>
        <ReactQueryWrapper>
          <RouterContext.Provider value={router}>
            {children}
          </RouterContext.Provider>
        </ReactQueryWrapper>
      </ThemeWrapper>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";

// override render method
export { customRender as render };
