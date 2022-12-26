import { fireEvent, render, screen } from "@testing-library/react";
import ChipItem, { Props } from "./Chip";
import { ThemeWrapper } from "src/test-utils";

describe("Chip", () => {
  const onClick = jest.fn();
  const onRemove = jest.fn();
  const chipName = "태그";

  const renderChip = ({ size, children, onRemove, onClick }: Props) =>
    render(
      <ChipItem onClick={onClick} onRemove={onRemove} size={size}>
        {children}
      </ChipItem>,
      { wrapper: ThemeWrapper },
    );

  describe("onRemove가 있다면 chip에 x이미지가 보인다.", () => {
    it("x 이미지를 클릭하면 chip을 삭제한다. ", () => {
      renderChip({
        size: "mini",
        children: chipName,
        onRemove,
      });

      const img = screen.getByAltText("태그 삭제하기");
      fireEvent.click(img);

      expect(onRemove).toBeCalled();
    });
  });

  describe("onClick 있으면 태그를 클릭할 수 있다", () => {
    it("클릭하면 onClick 호출한다. ", () => {
      renderChip({
        size: "mini",
        children: chipName,
        onClick,
      });

      const chip = screen.getByLabelText("태그 tag");
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
        renderChip({
          size: style.size as Props["size"],
          children: chipName,
        });

        const chip = screen.getByLabelText("태그");

        expect(chip).toHaveStyle(`font-size: ${style.fontScale}`);
      });
    });
  });
});
