import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import IconButton from "./IconButton";

describe("Button", () => {
  const onClick = jest.fn();
  const renderIconButton = () =>
    render(
      <IconButton width="" height="large" onClick={onClick}>
        버튼
      </IconButton>,
    );

  it("Iconbutton을 클릭하면 onClick이 호출된다. ", () => {
    const { getByText } = renderIconButton();
    const button = getByText("버튼");
    fireEvent.click(button);
    expect(onClick).toBeCalled();
  });
});
