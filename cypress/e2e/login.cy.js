/* eslint-disable testing-library/await-async-utils */
describe("Cypress login", () => {
  context("로그인이 성공하면", () => {
    it("홈에 메뉴 드랍다운이 보여야함.", () => {
      cy.login();
      cy.visit("/");

      cy.wait("@session");

      cy.get("[data-testid='nav-menu-dropdown']")
        .should("exist")
        .then(() => {
          cy.log("Cypress login successful");
        });
    });
  });

  context("로그아웃에 성공하면", () => {
    it("홈에 로그인 버튼이 보여아함.", () => {
      cy.logout();
      cy.get(".login-button").should("exist");
    });
  });
});
