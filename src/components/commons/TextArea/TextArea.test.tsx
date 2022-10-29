import { render, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "src/styles/globalStyle";
import TextArea, { TextAreaStyled } from "./TextArea";

describe("TextArea", () => {
  const onChange = jest.fn();

  const rederTextArea = ({ onChange, label }: TextAreaStyled) =>
    render(
      <ThemeProvider theme={theme}>
        <TextArea
          rows={4}
          maxLength={30}
          label={label}
          onChange={onChange}
          placeholder="textarea"
        ></TextArea>
      </ThemeProvider>,
    );
  it("textarea에 입력하면 textarea 길이가 변경되어야함", () => {
    const { getByTestId } = rederTextArea({ onChange, label: "라벨" });
    const textArea = getByTestId("textarea");
    const textAreaLen = getByTestId("textarea-length");
    const value = "textarea입력";
    fireEvent.change(textArea, { target: { value } });
    expect(textAreaLen).toHaveTextContent("10/30");
  });
});
