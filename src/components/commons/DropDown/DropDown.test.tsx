import { fireEvent, waitFor } from "@testing-library/react";
import { render } from "src/test-utils/customRender";
import DropdDown, { DropDownContext, DropDownContent } from "./DropDown";

describe("DropdDown", () => {
  const setIsActive = jest.fn();
  const renderDropdDown = (value: DropDownContent) =>
    render(
      <DropDownContext.Provider value={value}>
        <DropdDown trigger={<button>버튼</button>}>
          <DropdDown.List>
            <DropdDown.Item>버튼</DropdDown.Item>
          </DropdDown.List>
        </DropdDown>
      </DropDownContext.Provider>,
      {},
    );

  context("dropdown이 닫혀있을 때", () => {
    context("버튼 누르면", () => {
      it("dropdown이 열린다.", async () => {
        const { queryByTestId, getByTestId } = renderDropdDown({
          isActive: false,
          setIsActive,
        });

        const button = getByTestId("dropdown-trigger");
        fireEvent.click(button);

        const dropdown = queryByTestId("dropdown-list");
        waitFor(() => expect(dropdown).toBeInTheDocument());
      });
    });
  });

  context("dropdown이 열려있을 때", () => {
    context("esc 버튼을 누르면", () => {
      it("dropdown이 닫힌다.", async () => {
        const { queryAllByTestId } = renderDropdDown({
          isActive: true,
          setIsActive,
        });

        fireEvent.keyDown(global.document, {
          key: "Escape",
          code: "Escape",
          keyCode: 27,
          charCode: 27,
        });

        const dropdown = queryAllByTestId("dropdown-list");
        waitFor(() => expect(dropdown).not.toBeInTheDocument());
      });
    });

    context("버튼을 한번 더 누르면", () => {
      it("dropdown이 닫힌다.", () => {
        const { getByTestId } = renderDropdDown({
          isActive: true,
          setIsActive,
        });

        const trigger = getByTestId("dropdown-trigger");
        fireEvent.click(trigger);

        const dropdown = getByTestId("dropdown-list");
        waitFor(() => expect(dropdown).not.toBeInTheDocument());
      });
    });
  });
});
