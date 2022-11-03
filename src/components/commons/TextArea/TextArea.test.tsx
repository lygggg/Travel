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

  it("textarea에 글을 입력하면 onChange가 호출되어야 한다.", () => {
    const { getByTestId } = rederTextArea({ onChange, label: "라벨" });
    const textArea = getByTestId("textarea");
    const value = "textarea입력";
    fireEvent.change(textArea, { target: { value } });
    expect(onChange).toBeCalled();
  });

  it("label을 입력하면 label이 보여야 한다.", () => {
    const labelText = "라벨";
    const { getByText } = rederTextArea({
      onChange,
      label: labelText,
    });
    const labelNode = getByText(labelText);
    expect(labelNode).toBeInTheDocument();
  });

  it("textarea에 입력하면 TextLength의 text가 변경되어야함", () => {
    const { getByTestId } = rederTextArea({ onChange, label: "라벨" });
    const textArea = getByTestId("textarea");
    const textAreaLen = getByTestId("textarea-length");
    const value = "textarea입력";
    fireEvent.change(textArea, { target: { value } });
    expect(textAreaLen).toHaveTextContent("10/30");
  });
});
