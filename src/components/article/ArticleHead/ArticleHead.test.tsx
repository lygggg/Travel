import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { useSession } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import { NextRouter } from "next/router";
import { theme } from "src/styles/globalStyle";
import { createMockRouter } from "__mocks__/createMockRouter";
import ArticleHead, { Props } from "./ArticleHead";

jest.mock("next-auth/react");
jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
}));
global.alert = jest.fn();

const mockUseSession = (data: { email: string }) => {
  (useSession as jest.Mock).mockImplementation(() => {
    return {
      data: {
        user: data,
      },
    };
  });
};

describe("ArticleHead", () => {
  const queryClient = new QueryClient();

  const renderArticleHead = ({
    title,
    tags,
    thumbnailUrl,
    base64,
    syncTime,
    _id,
    name,
    email,
    router,
  }: Props & { router: NextRouter }) =>
    render(
      <ThemeProvider theme={theme}>
        <RouterContext.Provider value={router}>
          <QueryClientProvider client={queryClient}>
            <ArticleHead
              title={title}
              tags={tags}
              thumbnailUrl={thumbnailUrl}
              base64={base64}
              syncTime={syncTime}
              _id={_id}
              name={name}
              email={email}
            />
          </QueryClientProvider>
        </RouterContext.Provider>
      </ThemeProvider>,
    );

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {},
      },
    });
  });

  const props = {
    title: "타이틀",
    tags: ["tag1", "tag2"],
    thumbnailUrl:
      "https://mlog-lygggg.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/b15b6ee2-fcab-4520-8d11-09bd2a51a7c9/mlog.png",
    base64: "base64",
    syncTime: "syncTime",
    _id: "_id",
    name: "name",
    email: "baayoo93@gmail.com",
  };

  context("로그인 상태일때", () => {
    const router = createMockRouter({
      query: { userId: "baayoo93@gmail.com", id: "idfsdfds" },
      push: jest.fn(),
    });
    context("session email과 로그인한 article email 같다면", () => {
      it("수정 버튼이 보여야 한다.", () => {
        mockUseSession({ email: "baayoo93@gmail.com" });
        const { getByTestId } = renderArticleHead({ ...props, router });
        const modifyButton = getByTestId("modify-article");
        expect(modifyButton).toBeInTheDocument();
      });

      it("삭제 버튼이 보여야 한다.", () => {
        mockUseSession({ email: "baayoo93@gmail.com" });
        const { getByTestId } = renderArticleHead({ ...props, router });
        const removeButton = getByTestId("remove-article");
        expect(removeButton).toBeInTheDocument();
      });

      context("수정 버튼을 누르면", () => {
        it("/write 페이지로 이동한다.", () => {
          mockUseSession({ email: "baayoo93@gmail.com" });
          const { getByTestId } = renderArticleHead({ ...props, router });
          const writeLink = getByTestId("modify-article").closest("a");
          expect(writeLink).toHaveAttribute("href", `/write?id=${props._id}`);
        });
      });

      context("삭제 버튼을 누르면", () => {
        context("삭제에 성공하면", () => {
          it(`/${props.email} 페이지로 이동한다.`, () => {
            mockUseSession({ email: "baayoo93@gmail.com" });
            const { getByTestId } = renderArticleHead({ ...props, router });
            const removeButton = getByTestId("remove-article");
            fireEvent.click(removeButton);
            expect(router.push).toHaveBeenCalledWith(`/${props.email}`);
          });
        });
      });
    });

    context("session email과 로그인한 article email 같지 않다면", () => {
      it("수정 버튼이 안보여야 한다.", () => {
        mockUseSession({ email: "baayoo91@gmail.com" });
        const { queryByTestId } = renderArticleHead({ ...props, router });
        const modifyButton = queryByTestId("modify-article");
        expect(modifyButton).toBeNull();
      });

      it("삭제 버튼이 안보여야 한다.", () => {
        mockUseSession({ email: "baayoo91@gmail.com" });
        const { queryByTestId } = renderArticleHead({ ...props, router });
        const removeButton = queryByTestId("remove-article");
        expect(removeButton).toBeNull();
      });
    });
  });
});
