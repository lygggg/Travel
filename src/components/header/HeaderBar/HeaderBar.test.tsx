import { screen, render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { ThemeWrapper } from "src/test-utils";
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
  const renderHeaderBar = () =>
    render(<HeaderBar />, { wrapper: ThemeWrapper });

  context("로그인 상태일 때", () => {
    beforeEach(() => {
      mockUseSession({ email: "baayoo93@gmail.com", name: "이지존" });
    });

    it("로그인된 유저 이름이 보여야 한다.", () => {
      renderHeaderBar();

      const userName = screen.getByText("이지존.log");

      expect(userName).toBeInTheDocument();
    });

    it("메뉴 드롭다운이 보여야한다.", () => {
      renderHeaderBar();

      const menu = screen.getByTestId("nav-menu-dropdown");

      expect(menu).toBeInTheDocument();
    });

    context("유저 이름을 클릭하면", () => {
      it("유저의 블로그로 이동한다.", () => {
        renderHeaderBar();

        const myBlogLink = screen.getByText("이지존.log").closest("a");

        expect(myBlogLink).toHaveAttribute("href", `/baayoo93@gmail.com`);
      });
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
