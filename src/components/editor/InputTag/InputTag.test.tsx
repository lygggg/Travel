import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "src/styles/globalStyle";
import InputTag from "./InputTag";

describe("InputTag", () => {
  const onChange = jest.fn();
  const renderInputTag = () =>
    render(
      <ThemeProvider theme={theme}>
        <InputTag onChange={onChange} />
      </ThemeProvider>,
    );
  const text = "tag1";

  it("input에 태그를 입력한다. ", () => {
    const { getByLabelText } = renderInputTag();
    const input = getByLabelText("tag-input") as HTMLInputElement;

    fireEvent.change(input, { target: { value: text } });
    expect(input.value).toBe(text);
  });

  it("입력된 input을 enter하면 tag를 render한다.", async () => {
    const { getByText, getByLabelText } = renderInputTag();
    const input = getByLabelText("tag-input") as HTMLInputElement;

    fireEvent.change(input, { target: { value: text } });
    await fireEvent.keyUp(input, { key: "Enter", code: 13, charCode: 13 });

    expect(getByText(text)).not.toBeNull();
    expect(input.value).toBe("");
  });

  it("태그의 close 이미지를 클릭시 삭제한다. ", async () => {
    const { getByLabelText } = renderInputTag();
    const input = getByLabelText("tag-input");

    fireEvent.change(input, { target: { value: text } });
    await fireEvent.keyUp(input, { key: "Enter", code: 13, charCode: 13 });
    const closeImg = screen.getByAltText("removeTag");
    await fireEvent.click(closeImg);

    expect(screen.queryByText(text)).toBeNull();
  });

  it("Backspace 누르면 태그를 삭제한다.", async () => {
    const { getByLabelText } = renderInputTag();
    const input = getByLabelText("tag-input");

    fireEvent.change(input, { target: { value: text } });
    await fireEvent.keyUp(input, { key: "Enter", code: 13, charCode: 13 });

    await fireEvent.keyDown(input, {
      key: "Backspace",
      keyCode: 8,
      charCode: 8,
    });

    expect(screen.queryAllByText(text)).toHaveLength(0);
  });
});
