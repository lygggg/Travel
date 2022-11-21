import { fireEvent, render } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "src/styles/globalStyle";
import TagItem, { Props } from "./TagItem";

describe("TagItem", () => {
  const onClick = jest.fn();
  const onRemove = jest.fn();
  const tagName = "태그";
  const renderTagItem = ({ size, children, onRemove, onClick }: Props) =>
    render(
      <ThemeProvider theme={theme}>
        <TagItem onClick={onClick} onRemove={onRemove} size={size}>
          {children}
        </TagItem>
      </ThemeProvider>,
    );
  describe("onRemove가 있다면 tag에 x이미지가 보인다.", () => {
    it("x 이미지를 클릭하면 tag를 삭제한다. ", () => {
      const { getByAltText } = renderTagItem({
        size: "mini",
        children: tagName,
        onRemove,
      });
      const img = getByAltText("removeTag");
      fireEvent.click(img);
      expect(onRemove).toBeCalled();
    });
  });

  describe("onClick 있으면 태그를 클릭할 수 있다", () => {
    it("클릭하면 onClick 호출한다. ", () => {
      const { getByText } = renderTagItem({
        size: "mini",
        children: tagName,
        onClick,
      });
      const tag = getByText(tagName);
      fireEvent.click(tag);
      expect(onClick).toBeCalled();
    });
  });

  describe("스타일", () => {
    const styleMock = [
      {
        size: "medium",
        fontScale: "1.7rem",
      },
      {
        size: "small",
        fontScale: "1.3rem",
      },
      {
        size: "large",
        fontScale: "2rem",
      },
    ];
    // TODO 빨간줄??
    styleMock.forEach((style) => {
      it(`size가 ${style.size}이면 font-size가 ${style.fontScale}이다.`, () => {
        const { getByTestId } = renderTagItem({
          size: style.size as Props["size"],
          children: tagName,
        });
        const tag = getByTestId("tag-item");
        expect(tag).toHaveStyle(`font-size: ${style.fontScale}`);
      });
    });
  });
});
