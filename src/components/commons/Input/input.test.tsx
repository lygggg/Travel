import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "./index";

describe("Input", () => {
  const onChange = jest.fn();

  const renderInput = (placeholder: string) =>
    render(
      <Input
        width="50"
        height="50"
        placeholder={placeholder}
        onChange={onChange}
      />,
    );

  it("넘겨준 placeholder가 input placeholder에 반영된다.", () => {
    const placeholder = "placeholder";
    renderInput(placeholder);

    screen.getByPlaceholderText(placeholder);

    expect(screen.queryByPlaceholderText(placeholder)).not.toBeNull();
  });
});
