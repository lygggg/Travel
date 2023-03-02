import { fireEvent, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { NextRouter } from "next/router";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "__mocks__/createMockRouter";
import ArticleTagList, { Props } from "./ArticleTagList";
import { render } from "src/test-utils/customRender";

describe("ArticleTagList", () => {
  const renderArticleTagList = ({
    tags,
    router,
  }: Props & { router: NextRouter }) =>
    render(<ArticleTagList tags={tags} />, { router });

  const tags = ["태그1"];

  const router = createMockRouter({
    query: { userId: "baayoo93@gmail.com" },
    push: jest.fn(),
  });

  context("태그를 클릭하면", () => {
    it("해당 태그 url로 변해야함.", () => {
      renderArticleTagList({ tags, router });

      const tag = screen.getByText("태그1");
      fireEvent.click(tag);

      expect(router.push).toHaveBeenCalledWith({
        pathname: router.pathname,
        search: `tags=%ED%83%9C%EA%B7%B81`,
      });
    });
  });

  it("articleTagList가 출력되어야함.", () => {
    renderArticleTagList({ tags, router });

    const tag = screen.getByTestId("article-taglist");

    expect(tag).toBeInTheDocument();
  });
});
