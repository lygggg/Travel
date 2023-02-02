import { fireEvent, render, screen } from "@testing-library/react";
import { signIn } from "next-auth/react";
import LoginModal from "./LoginModal";
import { ThemeWrapper } from "src/test-utils";

jest.mock("next-auth/react");

describe("LoginModal", () => {
  const onClose = jest.fn();

  const renderLoginModal = () =>
    render(<LoginModal onClose={onClose} />, {
      wrapper: ThemeWrapper,
    });

  context("isActive가 true일때", () => {
    context("google 로그인 버튼을 클릭하면", () => {
      it("signIn이 호출된다. ", () => {
        renderLoginModal();

        const googleButton = screen.getByLabelText("구글 로그인하기");
        fireEvent.click(googleButton);

        expect(signIn).toBeCalled();
      });
    });

    context("Github 로그인 버튼을 클릭하면", () => {
      it("signIn이 호출된다. ", () => {
        renderLoginModal();

        const gitHubButton = screen.getByLabelText("깃허브 로그인하기");
        fireEvent.click(gitHubButton);

        expect(signIn).toBeCalled();
      });
    });

    context("Kakao 로그인 버튼을 클릭하면", () => {
      it("signIn이 호출된다. ", () => {
        renderLoginModal();

        const kakaoButton = screen.getByLabelText("카카오 로그인하기");
        fireEvent.click(kakaoButton);

        expect(signIn).toBeCalled();
      });
    });

    context("취소 버튼을 누르면 ", () => {
      it("handleClose 가 호출되어야 한다.", () => {
        renderLoginModal();

        const closeButton = screen.getByLabelText("취소");
        fireEvent.click(closeButton);

        expect(onClose).toBeCalled();
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
