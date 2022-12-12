import { fireEvent, waitFor, screen } from "@testing-library/react";
import { render } from "src/test-utils/customRender";
import DropdDown from "./DropDown";

describe("DropdDown", () => {
  const renderDropdDown = () =>
    render(
      <DropdDown trigger={<button>드랍다운 버튼</button>}>
        <DropdDown.List>
          <DropdDown.Item>버튼</DropdDown.Item>
        </DropdDown.List>
      </DropdDown>,
      {},
    );

  context("dropdown이 닫혀있을 때", () => {
    context("버튼 누르면", () => {
      it("dropdown이 열린다.", async () => {
        renderDropdDown();

        const button = screen.getByRole("button", { name: /드랍다운 버튼/i });
        fireEvent.click(button);

        const dropdown = screen.getByTestId("dropdown-list");
        expect(dropdown).toHaveStyle(`visibility: visible`);
      });
    });

    context("버튼을 한번 더 누르면", () => {
      it("dropdown이 닫힌다.", async () => {
        renderDropdDown();

        const trigger = screen.getByRole("button", { name: /드랍다운 버튼/i });
        const dropdown = screen.getByTestId("dropdown-list");

        fireEvent.click(trigger);
        expect(dropdown).toHaveStyle(`visibility: visible`);

        fireEvent.click(trigger);
        expect(dropdown).toHaveStyle(`visibility: hidden`);
      });
    });
  });

  context("dropdown이 열려있을 때", () => {
    context("esc 버튼을 누르면", () => {
      it("dropdown이 닫힌다.", async () => {
        renderDropdDown();

        const trigger = screen.getByRole("button", {
          name: /드랍다운 버튼/i,
        });

        fireEvent.click(trigger);
        fireEvent.keyDown(global.document, {
          key: "Escape",
          code: "Escape",
          keyCode: 27,
          charCode: 27,
        });

        const dropdown = screen.queryByTestId("dropdown-list");

        await waitFor(() => expect(dropdown).toHaveStyle(`visibility: hidden`));
      });
    });
  });
});
