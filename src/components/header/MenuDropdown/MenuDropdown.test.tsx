import { fireEvent, screen } from "@testing-library/react";
import { signOut, useSession } from "next-auth/react";
import { render } from "src/test-utils/customRender";
import MenuDropdown, { Props } from "./MenuDropdown";

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

describe("MenuDropdown", () => {
  const renderMenuDropdown = (props: Props) =>
    render(<MenuDropdown {...props}></MenuDropdown>, {});

  const menus = [
    { title: "새 글 작성", url: "/write" },
    { title: "내 블로그 가기", url: "/write" },
  ];

  beforeEach(() => {
    mockUseSession({ email: "baayoo93@gmail.com" });
  });

  context("dropdown이 열려있을 때", () => {
    context("로그아웃 버튼 누르면", () => {
      it("로그아웃 메서드가 호출된다.", async () => {
        renderMenuDropdown({
          items: menus,
          trigger: <button>버튼</button>,
        });

        const button = screen.getByText("로그아웃");
        fireEvent.click(button);

        expect(signOut).toBeCalled();
      });
    });

    context("드랍다운 메뉴 아이템을 누르면", () => {
      it("해당 url로 이동한다.", () => {
        renderMenuDropdown({
          items: menus,
          trigger: <button>버튼</button>,
        });

        const link = screen.getByText(`${menus[0].title}`).closest("a");

        expect(link).toHaveAttribute("href", `${menus[0].url}`);
      });
    });
  });
});
