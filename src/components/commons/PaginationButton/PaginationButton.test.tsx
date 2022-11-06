import { fireEvent, render, screen } from "@testing-library/react";
import PaginationButton, { Props } from "./PaginationButton";

describe("PaginationButton", () => {
  const onClick = jest.fn();

  const rederPaginationButton = (props: Props) =>
    render(<PaginationButton {...props}></PaginationButton>);
  it("pagination-button을 클릭하면 event가 호출되어야한다.", () => {
    const { getByTestId } = rederPaginationButton({
      button: <button>버튼</button>,
      total: 4,
      dataLength: 14,
      event: onClick,
    });
    const button = getByTestId("pagination-button");
    fireEvent.click(button);
    expect(onClick).toBeCalled();
  });

  it("dataLength의 길이가 total보다 작으면 더 보기 버튼이 보여야함.", () => {
    const { getByText } = rederPaginationButton({
      button: <button>더 보기</button>,
      total: 20,
      dataLength: 14,
      event: onClick,
    });
    const button = getByText("더 보기");
    expect(button).toBeInTheDocument();
  });
});
