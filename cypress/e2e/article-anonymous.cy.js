describe("article-anonymous spec", () => {
  context("로그인을 안한상태로", () => {
    beforeEach(() => {
      cy.clearCookies();
      cy.visit(`/baayoo93@gmail.com`);
    });
    context("글 상세페이지에서", () => {
      it("수정 삭제 버튼이 보이지 않아야 한다.", () => {
        cy.get("[data-testid='article-title']").first().click();

        cy.get("[data-testid='article-modify']").should("not.exist");
        cy.get("[data-testid='article-delete']").should("not.exist");
      });
    });
  });
});
