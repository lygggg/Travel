import { screen } from "@testing-library/react";
import { render } from "src/test-utils/customRender";
import { useSession } from "next-auth/react";
import HeaderBar from "./HeaderBar";

jest.mock("next-auth/react");

const mockUseSession = (data: { email: string; name: string }) => {
  (useSession as jest.Mock).mockImplementation(() => {
    return {
      data: {
        user: data,
      },
    };
  });
};

const mockNotUseSession = () => {
  (useSession as jest.Mock).mockImplementation(() => {
    return {};
  });
};

describe("HeaderBar", () => {
  const renderHeaderBar = () => render(<HeaderBar />, {});

  context("로그인 상태일 때", () => {
    beforeEach(() => {
      mockUseSession({ email: "baayoo93@gmail.com", name: "이지존" });
    });

    it("메뉴 드롭다운이 보여야한다.", () => {
      renderHeaderBar();

      const menu = screen.getByTestId("nav-menu-dropdown");

      expect(menu).toBeInTheDocument();
    });
  });

  context("로그인 상태가 아닐 떄", () => {
    beforeEach(() => {
      mockNotUseSession();
    });
    it("로그인된 유저 이름이 안보여야 한다.", () => {
      renderHeaderBar();

      const userName = screen.queryByText("이지존.log");

      expect(userName).not.toBeInTheDocument();
    });

    it("로그인 버튼이 보여야 한다.", () => {
      renderHeaderBar();

      const userName = screen.getByRole("button", { name: /로그인/i });

      expect(userName).toBeInTheDocument();
    });
  });
});
