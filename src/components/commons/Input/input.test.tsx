import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "src/styles/globalStyle";
import Input from "./Input";

describe("Input", () => {
  const onChange = jest.fn();
  const placeholder = "placeholder";
  const renderInput = (placeholder: string) =>
    render(
      <ThemeProvider theme={theme}>
        <Input
          variant="default"
          rounded="default"
          fontSize="large"
          onChange={onChange}
          placeholder={placeholder}
        />
        ,
      </ThemeProvider>,
    );

  it("넘겨준 placeholder가 input placeholder에 반영된다.", () => {
    renderInput(placeholder);

    screen.getByPlaceholderText(placeholder);

    expect(screen.queryByPlaceholderText(placeholder)).not.toBeNull();
  });

  it("input에 입력하면 onChange 호출 ", () => {
    const { getByPlaceholderText } = renderInput(placeholder);
    const input = getByPlaceholderText(placeholder);
    const value = "입력값";
    fireEvent.change(input, { target: { value } });
    expect(onChange).toBeCalled();
  });

  it("버튼 스타일 변경", () => {
    const { getByPlaceholderText, rerender } = renderInput(placeholder);
    const testObject = [
      {
        variant: "primary",
        fontSize: "small",
        rounded: "round",
        backgroundColor: `${theme.gray[500]}`,
        color: `${theme.white}`,
        fontScale: "1.3rem",
        borderRadius: "2rem",
      },
      {
        variant: "secondary",
        fontSize: "medium",
        rounded: "round",
        backgroundColor: `${theme.black[500]}`,
        color: `${theme.white}`,
        fontScale: "2rem",
        borderRadius: "2rem",
      },
      {
        variant: "tertiary",
        fontSize: "mini",
        rounded: "round",
        backgroundColor: `${theme.purple[500]}`,
        color: `${theme.white}`,
        fontScale: "0.5rem",
        borderRadius: "2rem",
      },
    ];

    const input = getByPlaceholderText(placeholder);

    // TODO 빨간줄??
    testObject.forEach((obj) => {
      rerender(
        <ThemeProvider theme={theme}>
          <Input
            variant={obj.variant}
            fontSize={obj.fontSize}
            rounded={obj.rounded}
            onChange={onChange}
            placeholder={placeholder}
          />
        </ThemeProvider>,
      );
      expect(input).toHaveStyle(`background-color: ${obj.backgroundColor}`);
      expect(input).toHaveStyle(`font-size:  ${obj.fontScale}`);
      expect(input).toHaveStyle(`border-radius: ${obj.borderRadius}`);
      expect(input).toHaveStyle(`color: ${obj.color}`);
    });
  });
});
