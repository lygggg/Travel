import { fireEvent, render } from "@testing-library/react";
import LoginModal from "./LoginModal";
import { theme } from "src/styles/globalStyle";
import { ThemeProvider } from "@emotion/react";

import { signIn } from "next-auth/react";

jest.mock("next-auth/react");

describe("LoginModal", () => {
  const handleClose = jest.fn();

  const renderLoginModal = () =>
    render(
      <ThemeProvider theme={theme}>
        <LoginModal isActive={true} handleClose={handleClose} />{" "}
      </ThemeProvider>,
    );

  context("isActive가 true일때", () => {
    context("google 로그인 버튼을 클릭하면", () => {
      it("signIn이 호출된다. ", () => {
        const { getByTestId } = renderLoginModal();
        const googleButton = getByTestId("google-login-button");
        fireEvent.click(googleButton);
        expect(signIn).toBeCalled();
      });
    });

    context("Github 로그인 버튼을 클릭하면", () => {
      it("signIn이 호출된다. ", () => {
        const { getByTestId } = renderLoginModal();
        const gitHubButton = getByTestId("github-login-button");
        fireEvent.click(gitHubButton);
        expect(signIn).toBeCalled();
      });
    });

    context("Kakao 로그인 버튼을 클릭하면", () => {
      it("ssignIn이 호출된다. ", () => {
        const { getByTestId } = renderLoginModal();
        const kakaoButton = getByTestId("kakao-login-button");
        fireEvent.click(kakaoButton);
        expect(signIn).toBeCalled();
      });
    });

    context("취소 버튼을 누르면 ", () => {
      it("handleClose 가 호출되어야 한다.", () => {
        const { getByTestId } = renderLoginModal();
        const closeButton = getByTestId("login-close");
        fireEvent.click(closeButton);
        expect(handleClose).toBeCalled();
      });
    });
  });

  context("isActive가 false일 때", () => {
    it("loginModal이 not render 되어야 한다.", () => {
      const { getByText } = renderLoginModal();
      const loginModalTitle = getByText("소셜 계정으로 로그인");
      expect(loginModalTitle).toBeInTheDocument();
    });
  });
});
