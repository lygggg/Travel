import { fireEvent, render, screen } from "@testing-library/react";
import PaginationButton, { Props } from "./PaginationButton";

describe("PaginationButton", () => {
  const onClick = jest.fn();

  const renderPaginationButton = (props: Props) =>
    render(<PaginationButton {...props}></PaginationButton>);

  context("dataLength의 길이가 total보다 작으면 ", () => {
    it("더 보기 버튼이 보여야함.", () => {
      renderPaginationButton({
        button: <button>목록 더 보기</button>,
        total: 20,
        dataLength: 14,
        event: onClick,
      });

      const button = screen.getByRole("button", { name: /목록 더 보기/i });

      expect(button).toBeInTheDocument();
    });

    context("더 보기버튼을 클릭하면", () => {
      it("event가 호출되어야한다.", () => {
        renderPaginationButton({
          button: <button>목록 더 보기</button>,
          total: 20,
          dataLength: 14,
          event: onClick,
        });

        const button = screen.getByRole("button", { name: /목록 더 보기/i });
        fireEvent.click(button);

        expect(onClick).toBeCalled();
      });
    });
  });

  context("dataLength의 길이가 total보다 작으면", () => {
    it("더 보기 버튼이 안보여야함.", () => {
      renderPaginationButton({
        button: <button>목록 더 보기</button>,
        total: 14,
        dataLength: 14,
        event: onClick,
      });

      const button = screen.queryByRole("button", { name: /목록 더 보기/i });

      expect(button).not.toBeInTheDocument();
    });
  });
});
