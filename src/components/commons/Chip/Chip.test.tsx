import { fireEvent, render } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "src/styles/globalStyle";
import ChipItem, { Props } from "./Chip";

describe("Chip", () => {
  const onClick = jest.fn();
  const onRemove = jest.fn();
  const chipName = "태그";
  const renderChip = ({ size, children, onRemove, onClick }: Props) =>
    render(
      <ThemeProvider theme={theme}>
        <ChipItem onClick={onClick} onRemove={onRemove} size={size}>
          {children}
        </ChipItem>
      </ThemeProvider>,
    );
  describe("onRemove가 있다면 chip에 x이미지가 보인다.", () => {
    it("x 이미지를 클릭하면 chip을 삭제한다. ", () => {
      const { getByAltText } = renderChip({
        size: "mini",
        children: chipName,
        onRemove,
      });
      const img = getByAltText("removeChip");
      fireEvent.click(img);
      expect(onRemove).toBeCalled();
    });
  });

  describe("onClick 있으면 태그를 클릭할 수 있다", () => {
    it("클릭하면 onClick 호출한다. ", () => {
      const { getByText } = renderChip({
        size: "mini",
        children: chipName,
        onClick,
      });
      const chip = getByText(chipName);
      fireEvent.click(chip);
      expect(onClick).toBeCalled();
    });
  });

  describe("스타일", () => {
    const styleMock = [
      {
        size: "medium",
        fontScale: "1.7rem",
        padding: "0.5rem",
      },
      {
        size: "small",
        fontScale: "1.2rem",
        padding: "0.4rem",
      },
      {
        size: "large",
        fontScale: "2rem",
        padding: "0.7rem",
      },
    ];

    styleMock.forEach((style) => {
      it(`size가 ${style.size}이면 font-size가 ${style.fontScale}이고 padding이 ${style.padding}이다.`, () => {
        const { getByTestId } = renderChip({
          size: style.size as Props["size"],
          children: chipName,
        });
        const chip = getByTestId("chip-item");
        expect(chip).toHaveStyle(`font-size: ${style.fontScale}`);
      });
    });
  });
});
