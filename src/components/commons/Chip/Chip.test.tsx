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

  context("onRemove가 있다면 ", () => {
    context("Chip컴포넌트의 x 이미지를 클릭하면", () => {
      it("chip이 삭제된다. ", () => {
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
  });

  context("onClick 있으면", () => {
    it("태그를 클릭하면 onClick 호출한다. ", () => {
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

  describe("Chip style test", () => {
    const styleMock = [
      {
        size: "medium",
        fontScale: "1.7rem",
        padding: "9px 22px !important",
      },
      {
        size: "small",
        fontScale: "1.1rem",
        padding: "9px 20px !important",
      },
      {
        size: "large",
        fontScale: "2rem",
        padding: "9px 22px !important",
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
