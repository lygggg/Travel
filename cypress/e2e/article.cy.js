/* eslint-disable testing-library/await-async-utils */
describe("article spec", () => {
  before(() => {
    cy.login();
    cy.visit("/");
    cy.wait("@session");
  });

  context("작성하기 페이지에서", () => {
    beforeEach(() => {
      cy.visit("/write");
    });

    context("제목을 작성하지않고", () => {
      context("작성 완료를 누르면", () => {
        it("제목을 작성해주세요 알람이 나온다.", () => {
          cy.get("[data-testid='write-button']").click();

          cy.get("[data-testid='send-write-button']").click({ force: true });

          cy.on("window:alert", (t) => {
            expect(t).to.contains("제목을 작성해주세요");
          });
        });
      });
    });

    context("제목, 태그, 본문, 소개글을 모두 입력하고", () => {
      context("작성 완료를 누르면", () => {
        it("내 블로그에 글과 태그가 추가되어야함.", () => {
          cy.get("[data-testid='editor-title-input']").type("title 입니다.", {
            force: true,
          });

          cy.get("[data-testid='editor-tag-input']").type("태그1{enter}", {
            force: true,
          });

          cy.get(".toastui-editor-pseudo-clipboard").type("content 입니다.", {
            force: true,
          });

          cy.get("[data-testid='write-button']").click({
            force: true,
          });

          cy.get(".editor-description-input").type("짧게 소개하기");

          cy.get("[data-testid='send-write-button']").click({
            force: true,
          });

          cy.get("[data-testid='article-title']")
            .eq(0)
            .then((title) => {
              expect(title.text()).to.eq("title 입니다.");
            });

          cy.get("[data-testid='article-item-tag']")
            .eq(0)
            .then((tag) => {
              expect(tag.text()).to.eq("태그1");
            });
        });
      });
    });
  });

  context("내 블로그 페이지에서", () => {
    beforeEach(() => {
      cy.fixture("session").then((session) => {
        cy.login();
        cy.visit(`/${session.user.email}`);
        cy.wait("@session");
      });
    });

    context("블로그 글을 클릭하면", () => {
      it("상세 페이지를 보여준다.", () => {
        cy.get("[data-testid='article-title']").first().click();

        cy.get("[data-testid='article-head']").should("exist");
      });
    });

    context("상세 페이지에서", () => {
      context("수정 버튼을 클릭하면", () => {
        it("해당 글과 태그를 수정할 수 있다.", () => {
          cy.get("[data-testid='article-title']").first().click();
          cy.get("[data-testid='article-modify']").click();

          cy.get("[data-testid='editor-title-input']")
            .clear()
            .type("수정 테스트 title 입니다.", {
              force: true,
            });

          cy.get("[data-testid='editor-tag-input']").type(
            "{backspace}태그 수정1{enter}",
            {
              force: true,
            },
          );

          cy.get(".toastui-editor-pseudo-clipboard").type(
            "수정된 content 입니다.",
            {
              force: true,
            },
          );

          cy.get("[data-testid='write-button']").click({
            force: true,
          });

          cy.get(".editor-description-input").type("수정된 짧게 소개하기");

          cy.get("[data-testid='send-write-button']").click({
            force: true,
          });

          cy.get("[data-testid='article-title']")
            .eq(0)
            .then((title) => {
              expect(title.text()).to.eq("수정 테스트 title 입니다.");
            });

          cy.get("[data-testid='article-item-tag']")
            .eq(0)
            .then((tag) => {
              expect(tag.text()).to.eq("태그 수정1");
            });
        });
      });

      context("삭제 버튼을 클릭하면", () => {
        it("해당 글은 태그와 함께 삭제 되어야 한다.", () => {
          cy.get("[data-testid='article-title']").then((articles) => {
            const articleCount = articles.length;

            cy.get("[data-testid='article-tag']").then((tags) => {
              const tagCount = tags.length;

              cy.get("[data-testid='article-title']").first().click();

              cy.get("[data-testid='article-head-tag']").then((removeTags) => {
                const removeTagCount = removeTags.length;

                cy.get("[data-testid='article-delete']").click();

                cy.get("[data-testid='article-title']").then((titles) => {
                  expect(titles.length).to.eq(articleCount - 1);
                });

                cy.get("[data-testid='article-tag']").then((tags) => {
                  expect(tags.length).to.eq(tagCount - removeTagCount);
                });
              });
            });
          });
        });
      });
    });
  });
});
