import { fireEvent, waitFor } from "@testing-library/react";
import { signOut, useSession } from "next-auth/react";
import { render } from "src/test-utils/customRender";
import MenuDropdown, { Props } from "./MenuDropdown";
import {
  DropDownContext,
  DropDownContent,
} from "src/components/commons/DropDown/DropDown";

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
  const renderMenuDropdown = (props: Props & { value: DropDownContent }) =>
    render(
      <DropDownContext.Provider value={props.value}>
        <MenuDropdown {...props}></MenuDropdown>
      </DropDownContext.Provider>,
      {},
    );

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
        const { getByText } = renderMenuDropdown({
          items: menus,
          trigger: <button>버튼</button>,
          value: { isActive: true },
        });

        const button = getByText("로그아웃");
        fireEvent.click(button);

        expect(signOut).toBeCalled();
      });
    });
  });
});
