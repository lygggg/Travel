import { fireEvent, render, screen } from "@testing-library/react";
import { signIn } from "next-auth/react";
import LoginModal from "./LoginModal";
import { ThemeWrapper } from "src/test-utils";

jest.mock("next-auth/react");

describe("LoginModal", () => {
  const handleClose = jest.fn();

  const renderLoginModal = () =>
    render(<LoginModal isActive={true} handleClose={handleClose} />, {
      wrapper: ThemeWrapper,
    });

  context("isActive가 true일때", () => {
    context("google 로그인 버튼을 클릭하면", () => {
      it("signIn이 호출된다. ", () => {
        renderLoginModal();

        const googleButton = screen.getByRole("button", {
          name: /Google 로그인/i,
        });
        fireEvent.click(googleButton);

        expect(signIn).toBeCalled();
      });
    });

    context("Github 로그인 버튼을 클릭하면", () => {
      it("signIn이 호출된다. ", () => {
        renderLoginModal();

        const gitHubButton = screen.getByRole("button", {
          name: /Github 로그인/i,
        });
        fireEvent.click(gitHubButton);

        expect(signIn).toBeCalled();
      });
    });

    context("Kakao 로그인 버튼을 클릭하면", () => {
      it("ssignIn이 호출된다. ", () => {
        renderLoginModal();

        const kakaoButton = screen.getByRole("button", {
          name: /Kakao 로그인/i,
        });
        fireEvent.click(kakaoButton);

        expect(signIn).toBeCalled();
      });
    });

    context("취소 버튼을 누르면 ", () => {
      it("handleClose 가 호출되어야 한다.", () => {
        renderLoginModal();

        const closeButton = screen.getByRole("button", { name: /취소/i });
        fireEvent.click(closeButton);

        expect(handleClose).toBeCalled();
      });
    });
  });

  context("isActive가 false일 때", () => {
    it("loginModal이 not render 되어야 한다.", () => {
      renderLoginModal();

      const loginModalTitle = screen.getByText("소셜 계정으로 로그인");

      expect(loginModalTitle).toBeInTheDocument();
    });
  });
});
