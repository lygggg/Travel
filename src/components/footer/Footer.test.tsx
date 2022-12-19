import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  const renderFooter = () => render(<Footer />);

  it("footer에 텍스트가 보여야한다.", () => {
    renderFooter();
    expect(
      screen.getByText("© 2022 lygggg All rights reserved."),
    ).toBeInTheDocument();
  });
});
