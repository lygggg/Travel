import { render } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal", () => {
  const rederModal = () =>
    render(
      <div id="portal">
        <Modal>
          <div>child</div>
        </Modal>
      </div>,
    );
  it("portal에 render되어야함.", () => {
    const { getByTestId } = rederModal();
    const modal = getByTestId("modal");
    expect(modal).toBeInTheDocument();
  });
});
