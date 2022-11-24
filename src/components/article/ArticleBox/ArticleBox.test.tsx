import { render } from "@testing-library/react";
import ArticleBox from "./ArticleBox";

describe("ArticleBox", () => {
  it("should render correctly", () => {
    const props = {
      _id: "id입니다",
      title: "타이틀입니다.",
      tags: ["태그1", "태그2"],
      content: "콘텐트입니다",
      syncTime: "날짜",
      name: "이름",
      email: "이메일",
      base64: "base64",
      introduction: "소개",
      thumbnailUrl: "썸네일",
    };
    render(<ArticleBox article={props} />);
  });
});
