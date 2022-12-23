import { before } from "node:test";

/* eslint-disable testing-library/await-async-utils */
describe("empty spec", () => {
  before(() => {
    cy.login();
    // Visit a route in order to allow cypress to actually set the cookie
    cy.visit("/");
    // Wait until the intercepted request is ready
    cy.wait("@session");
  });
  context("글 작성하러 가기 버튼을 누르면", () => {
    it("write 페이지로 이동한다.", () => {});
  });
});
