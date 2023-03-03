import { fireEvent, waitFor, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { NextRouter } from "next/router";
import { createMockRouter } from "__mocks__/createMockRouter";
import ArticleHead, { Props } from "./ArticleHead";
import { deleteArticle } from "src/api/article";
import { render } from "src/test-utils/customRender";

jest.mock("next-auth/react");
jest.mock("src/api/article");

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
  const mockAlert = jest.fn();
  global.alert = mockAlert;

  const renderArticleHead = ({
    article,
    router,
  }: Props & { router: NextRouter }) =>
    render(<ArticleHead article={article} />, { router: router });

  const props = {
    _id: "6376fd25e856265b7d974fcb",
    tags: ["tag1", "tag2"],
    content: "",
    syncTime: "syncTime",
    name: "name",
    email: "baayoo93@gmail.com",
    thumbnailUrl:
      "https://mlog-lygggg.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/b15b6ee2-fcab-4520-8d11-09bd2a51a7c9/mlog.png",
    title: "타이틀",
    description: "소개",
  };

  const router = createMockRouter({
    query: { userId: "baayoo93@gmail.com", id: "idfsdfds" },
    push: jest.fn(),
  });

  context("로그인 상태일때", () => {
    beforeEach(() => {
      mockUseSession({ email: "baayoo93@gmail.com" });
    });

    context("session email과 로그인한 article email 같다면", () => {
      it("수정 버튼이 보여야 한다.", () => {
        renderArticleHead({ article: props, router });

        const modifyButton = screen.getByRole("button", { name: /수정/i });

        expect(modifyButton).toBeInTheDocument();
      });

      it("삭제 버튼이 보여야 한다.", () => {
        renderArticleHead({ article: props, router });

        const removeButton = screen.getByRole("button", { name: /삭제/i });

        expect(removeButton).toBeInTheDocument();
      });

      context("수정 버튼을 누르면", () => {
        it("/write 페이지로 이동한다.", () => {
          renderArticleHead({ article: props, router });

          const writeLink = screen
            .getByRole("button", { name: /수정/i })
            .closest("a");

          expect(writeLink).toHaveAttribute("href", `/write?id=${props._id}`);
        });
      });

      context("삭제 버튼을 누르면", () => {
        context("삭제에 성공하면", () => {
          beforeEach(() =>
            (deleteArticle as jest.Mock).mockResolvedValue({
              response: { status: 200 },
            }),
          );
          it(`/articles 페이지로 이동한다.`, async () => {
            renderArticleHead({ article: props, router });

            const removeButton = screen.getByRole("button", { name: /삭제/i });
            await fireEvent.click(removeButton);

            await waitFor(() =>
              expect(router.push).toHaveBeenCalledWith(`/articles`),
            );
          });
        });
      });

      context("삭제에 실패하면", () => {
        beforeEach(() =>
          (deleteArticle as jest.Mock).mockRejectedValue({
            response: { status: 500 },
          }),
        );

        it(`삭제 실패 alert가 뜬다`, async () => {
          renderArticleHead({ article: props, router });

          const removeButton = screen.getByRole("button", { name: /삭제/i });
          await fireEvent.click(removeButton);

          await waitFor(async () =>
            expect(mockAlert).toHaveBeenCalledWith("삭제 실패"),
          );
        });
      });
    });

    context("session email과 로그인한 article email 같지 않다면", () => {
      beforeEach(() => {
        mockUseSession({ email: "baayoo91@gmail.com" });
      });
      it("수정 버튼이 안보여야 한다.", () => {
        renderArticleHead({ article: props, router });

        const modifyButton = screen.queryByRole("button", { name: /수정/i });

        expect(modifyButton).not.toBeInTheDocument();
      });

      it("삭제 버튼이 안보여야 한다.", () => {
        renderArticleHead({ article: props, router });

        const removeButton = screen.queryByRole("button", { name: /삭제/i });

        expect(removeButton).not.toBeInTheDocument();
      });
    });
  });
});
