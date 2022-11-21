import { fireEvent, render } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "src/styles/globalStyle";
import Button, { ButtonStyled } from "./Button";

describe("Button", () => {
  const onClick = jest.fn();
  const renderButton = ({ children, variant, rounded, size }: ButtonStyled) =>
    render(
      <ThemeProvider theme={theme}>
        <Button
          variant={variant}
          size={size}
          rounded={rounded}
          onClick={onClick}
        >
          {children}
        </Button>
        ,
      </ThemeProvider>,
    );

  it("button을 클릭하면 onClick이 호출된다. ", () => {
    const { getByText } = renderButton({
      children: "버튼",
      variant: "default",
      rounded: true,
      size: "large",
    });
    const button = getByText("버튼");
    fireEvent.click(button);
    expect(onClick).toBeCalled();
  });

  describe("스타일", () => {
    const styleMock = [
      {
        variant: "primary",
        size: "mini",
        rounded: true,
        backgroundColor: `${theme.gray[500]}`,
        padding: "0 0.5rem",
        borderRadius: "2rem",
      },
      {
        variant: "secondary",
        size: "small",
        rounded: false,
        backgroundColor: `${theme.black[500]}`,
        padding: "0.25rem 0.5rem",
        borderRadius: "0.3rem",
      },
      {
        variant: "tertiary",
        size: "medium",
        rounded: false,
        backgroundColor: `${theme.purple[500]}`,
        padding: "0.625rem 0.875rem",
        borderRadius: "0.3rem",
      },
    ];

    // TODO 빨간줄??
    styleMock.forEach((style) => {
      it(`variant, size, rounded를 테스트한다.`, () => {
        const { getByText } = renderButton({
          children: "버튼",
          variant: style.variant as ButtonStyled["variant"],
          rounded: style.rounded,
          size: style.size as ButtonStyled["size"],
        });

        const button = getByText("버튼");
        expect(button).toHaveStyle(
          `background-color: ${style.backgroundColor}`,
        );
        expect(button).toHaveStyle(`padding:  ${style.padding}`);
        expect(button).toHaveStyle(`border-radius: ${style.borderRadius}`);
      });
    });
  });
});
