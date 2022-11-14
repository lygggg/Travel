import { render, screen } from "@testing-library/react";
import Modal, { Props } from "./Modal";

describe("Modal", () => {
  const rederModal = ({ children, isActive }: Props) =>
    render(
      <div id="portal">
        <Modal isActive={isActive}>
          <div>{children}</div>
        </Modal>
      </div>,
    );

  context("isActive가 true면", () => {
    it("portal에 modal이 존재해야 한다.", () => {
      const { getByTestId } = rederModal({ children: "modal", isActive: true });
      const modal = getByTestId("modal");
      expect(modal).toBeInTheDocument();
    });
  });

  context("isActive가 false면", () => {
    it("portal에 modal이 존재하지 않아야 한다.", async () => {
      rederModal({
        children: "modal",
        isActive: false,
      });
      const modal = await screen.queryByText("modal");
      expect(modal).not.toBeInTheDocument();
    });
  });
});
