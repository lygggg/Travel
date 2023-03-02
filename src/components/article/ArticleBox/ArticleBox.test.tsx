import { render, screen } from "@testing-library/react";
import { ThemeWrapper } from "src/test-utils";
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
      thumbnailUrl:
        "https://mlog-lygggg.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/f4a284de-7dd2-49db-a0c5-96e43e373de4/mlog.png",
    };
    render(<ArticleBox article={props} />, { wrapper: ThemeWrapper });

    expect(screen.getByText(/타이틀입니다./)).toBeInTheDocument();
    expect(screen.getByText(/소개/)).toBeInTheDocument();
    expect(screen.getByText(/날짜/)).toBeInTheDocument();
    expect(screen.getByText(/날짜/)).toBeInTheDocument();
  });
});
