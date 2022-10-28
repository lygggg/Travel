import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "src/styles/globalStyle";
import Button from "./Button";

describe("Button", () => {
  const onClick = jest.fn();
  const renderButton = () =>
    render(
      <ThemeProvider theme={theme}>
        <Button
          variant="default"
          size="large"
          rounded="default"
          onClick={onClick}
        >
          버튼
        </Button>
        ,
      </ThemeProvider>,
    );

  it("button을 클릭하면 onClick이 호출된다. ", () => {
    const { getByText } = renderButton();
    const button = getByText("버튼");
    fireEvent.click(button);
    expect(onClick).toBeCalled();
  });

  it("버튼 스타일 변경", () => {
    const { getByText, rerender } = renderButton();
    const testObject = [
      {
        variant: "primary",
        size: "mini",
        rounded: "round",
        backgroundColor: `${theme.gray[500]}`,
        padding: "0 0.5rem",
        borderRadius: "2rem",
      },
      {
        variant: "secondary",
        size: "small",
        backgroundColor: `${theme.black[500]}`,
        padding: "0.25rem 0.5rem",
        borderRadius: "0.3rem",
      },
      {
        variant: "tertiary",
        size: "medium",
        backgroundColor: `${theme.purple[500]}`,
        padding: "0.625rem 0.875rem",
        borderRadius: "0.3rem",
      },
    ];

    const button = getByText("버튼");

    // TODO 빨간줄??
    testObject.forEach((obj) => {
      rerender(
        <ThemeProvider theme={theme}>
          <Button
            variant={obj.variant}
            size={obj.size}
            rounded={obj.rounded}
            onClick={onClick}
          >
            버튼
          </Button>
        </ThemeProvider>,
      );
      expect(button).toHaveStyle(`background-color: ${obj.backgroundColor}`);
      expect(button).toHaveStyle(`padding:  ${obj.padding}`);
      expect(button).toHaveStyle(`border-radius: ${obj.borderRadius}`);
    });
  });
});
