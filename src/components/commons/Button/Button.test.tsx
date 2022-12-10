import { fireEvent, render, screen } from "@testing-library/react";
import { theme } from "src/styles/globalStyle";
import Button, { ButtonStyled } from "./Button";
import { ThemeWrapper } from "src/test-utils";

describe("Button", () => {
  const onClick = jest.fn();
  const renderButton = ({ children, variant, rounded, size }: ButtonStyled) =>
    render(
      <Button variant={variant} size={size} rounded={rounded} onClick={onClick}>
        {children}
      </Button>,
      { wrapper: ThemeWrapper },
    );

  it("button을 클릭하면 onClick이 호출된다. ", () => {
    renderButton({
      children: "버튼",
      variant: "default",
      rounded: true,
      size: "large",
    });

    const button = screen.getByRole("button", { name: /버튼/i });
    fireEvent.click(button);

    expect(onClick).toBeCalled();
  });

  describe("스타일", () => {
    const styleMock = [
      {
        variant: "primary",
        size: "mini",
        rounded: true,
        backgroundColor: `${theme.green[700]}`,
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
        renderButton({
          children: "버튼",
          variant: style.variant as ButtonStyled["variant"],
          rounded: style.rounded,
          size: style.size as ButtonStyled["size"],
        });

        const button = screen.getByRole("button", { name: /버튼/i });

        expect(button).toHaveStyle(
          `background-color: ${style.backgroundColor}`,
        );
        expect(button).toHaveStyle(`padding:  ${style.padding}`);
        expect(button).toHaveStyle(`border-radius: ${style.borderRadius}`);
      });
    });
  });
});
