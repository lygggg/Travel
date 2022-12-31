import { fireEvent, render, screen } from "@testing-library/react";
import IconButton from "./IconButton";

describe("IconButton", () => {
  const onClick = jest.fn();
  const renderIconButton = () =>
    render(
      <IconButton width="" height="large" onClick={onClick}>
        버튼
      </IconButton>,
    );

  context("Iconbutton을 클릭하면", () => {
    it("onClick이 호출된다. ", () => {
      renderIconButton();
      const button = screen.getByText("버튼");
      fireEvent.click(button);
      expect(onClick).toBeCalled();
    });
  });
});
