import {} from "@testing-library/react";
import { useSession } from "next-auth/react";
import { render } from "src/test-utils/customRender";
import HeaderBar from "./HeaderBar";

jest.mock("next-auth/react");

const mockUseSession = (data: { email: string }) => {
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
      mockUseSession({ email: "baayoo93@gmail.com" });
    });

    it("로그인된 유저 이름이 보여야 한다.", () => {
      const { getByTestId } = renderHeaderBar();
      const userName = getByTestId("nav-username");

      expect(userName).toBeInTheDocument();
    });

    it("메뉴 드롭다운이 보여야한다.", () => {
      const { queryByTestId } = renderHeaderBar();
      const menu = queryByTestId("nav-menu-dropdown");

      expect(menu).toBeInTheDocument();
    });

    context("유저 이름을 클릭하면", () => {
      it("유저의 블로그로 이동한다.", () => {
        const { getByTestId } = renderHeaderBar();
        const myBlogLink = getByTestId("nav-username").closest("a");

        expect(myBlogLink).toHaveAttribute("href", `/baayoo93@gmail.com`);
      });
    });
  });

  context("로그인 상태가 아닐 떄", () => {
    beforeEach(() => {
      mockNotUseSession();
    });
    it("로그인된 유저 이름이 안보여야 한다.", () => {
      const { queryByTestId } = renderHeaderBar();
      const userName = queryByTestId("nav-username");

      expect(userName).not.toBeInTheDocument();
    });

    it("로그인 버튼이 보여야 한다.", () => {
      const { getByText } = renderHeaderBar();
      const userName = getByText("로그인");

      expect(userName).toBeInTheDocument();
    });
  });
});
