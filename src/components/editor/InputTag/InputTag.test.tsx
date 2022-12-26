import { fireEvent, render, screen } from "@testing-library/react";
import InputTag from "./InputTag";
import { ThemeWrapper } from "src/test-utils";

describe("InputTag", () => {
  const onChange = jest.fn();

  const renderInputTag = () =>
    render(<InputTag onChange={onChange} />, { wrapper: ThemeWrapper });
  const text = "tag1";

  context("tagInput에 에 입력하면", () => {
    it("input text가 변경된다.", () => {
      renderInputTag();

      const input = screen.getByLabelText("tag-input") as HTMLInputElement;
      fireEvent.change(input, { target: { value: text } });

      expect(input.value).toBe(text);
    });
  });

  context("입력된 input을 enter하면", () => {
    it("tag를 화면에 출력한다.", async () => {
      renderInputTag();

      const input = screen.getByLabelText("tag-input") as HTMLInputElement;

      fireEvent.change(input, { target: { value: text } });
      await fireEvent.keyUp(input, { key: "Enter", code: 13, charCode: 13 });

      expect(screen.getByText(text)).toBeInTheDocument();
      expect(input.value).toBe("");
    });
  });

  context("태그의 close 이미지를 클릭하면", () => {
    it("태그가 삭제된다.", async () => {
      renderInputTag();

      const input = screen.getByLabelText("tag-input");

      fireEvent.change(input, { target: { value: text } });
      await fireEvent.keyUp(input, { key: "Enter", code: 13, charCode: 13 });

    const closeImg = screen.getByAltText("태그 삭제하기");
    await fireEvent.click(closeImg);

      expect(screen.queryByText(text)).not.toBeInTheDocument();
    });
  });

  context("Backspace 누르면", () => {
    it("태그가 삭제된다.", async () => {
      renderInputTag();

      const input = screen.getByLabelText("tag-input");
      fireEvent.change(input, { target: { value: text } });

      await fireEvent.keyUp(input, { key: "Enter", code: 13, charCode: 13 });
      await fireEvent.keyDown(input, {
        key: "Backspace",
        keyCode: 8,
        charCode: 8,
      });

      expect(screen.queryByText(text)).not.toBeInTheDocument();
    });
  });
});
