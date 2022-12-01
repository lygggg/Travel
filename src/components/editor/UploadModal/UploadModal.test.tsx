import { fireEvent, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { MutableSnapshot } from "recoil";
import UploadModal, { Props } from "./UploadModal";
import { createMockRouter } from "__mocks__/createMockRouter";
import { articleState } from "src/store/article";
import { render } from "src/test-utils/customRender";
import { postArticle } from "src/api/article";

jest.mock("next-auth/react");
jest.mock("src/api/article");
const mockAlert = jest.fn();
global.alert = mockAlert;

const mockUseSession = (data: { email: string }) => {
  (useSession as jest.Mock).mockImplementation(() => {
    return {
      data: {
        user: data,
      },
    };
  });
};

describe("UploadModal", () => {
  const handleClose = jest.fn();
  const router = createMockRouter({
    query: { userId: "baayoo93@gmail.com", id: "idfsdfds" },
    push: jest.fn(),
  });
  const renderUploadModal = ({
    isActive,
    handleClose,
    initializeState,
  }: Props & {
    initializeState?: (mutableSnapshot: MutableSnapshot) => void;
  }) =>
    render(<UploadModal isActive={isActive} handleClose={handleClose} />, {
      router: router,
      initializeState,
    });

  beforeEach(() => mockUseSession({ email: "baayoo93@gmail.com" }));
  const initialRecoilState = ({ set }: MutableSnapshot) => {
    set(articleState, {
      content: "content",
      tags: ["tag1"],
      title: "제목",
      thumbnailUrl:
        "https://mlog-lygggg.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/f4a284de-7dd2-49db-a0c5-96e43e373de4/mlog.png",
      introduction: "introduction",
      syncTime: "syncTime",
    });
  };
  context("업로드 완료 버튼을 클릭했을 때. ", () => {
    context("제목을 작성하지 않으면", () => {
      const initialRecoilState = ({ set }: MutableSnapshot) => {
        set(articleState, {
          content: "content",
          tags: ["tag1"],
          title: "",
          thumbnailUrl:
            "https://mlog-lygggg.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/f4a284de-7dd2-49db-a0c5-96e43e373de4/mlog.png",
          introduction: "introduction",
          syncTime: "syncTime",
        });
      };
      it("제목을 작성해주세요 alert가 뜬다.", async () => {
        const { getByTestId } = renderUploadModal({
          isActive: true,
          handleClose,
          initializeState: initialRecoilState,
        });
        const button = getByTestId("upload-button");
        fireEvent.click(button);
        await waitFor(async () =>
          expect(mockAlert).toHaveBeenCalledWith("제목을 작성해주세요"),
        );
      });
    });

    context("제목을 작성했다면", () => {
      context("post 요청이 실패하면", () => {
        beforeEach(() =>
          (postArticle as jest.Mock).mockImplementation(() =>
            Promise.reject({ response: { status: 500 } }),
          ),
        );
        it("upload failed. alert가 나온다.", async () => {
          const { getByTestId } = renderUploadModal({
            isActive: true,
            handleClose,
            initializeState: initialRecoilState,
          });
          const button = getByTestId("upload-button");
          fireEvent.click(button);

          await waitFor(async () =>
            expect(mockAlert).toHaveBeenCalledWith("upload failed."),
          );
        });
      });
    });

    context("post 요청이 성공하면", () => {
      beforeEach(() =>
        (postArticle as jest.Mock).mockResolvedValue({
          response: { status: 200 },
        }),
      );
      it("내 블로그로 이동한다.", async () => {
        const { getByTestId } = renderUploadModal({
          isActive: true,
          handleClose,
          initializeState: initialRecoilState,
        });
        const button = getByTestId("upload-button");
        fireEvent.click(button);
        await waitFor(() => expect(router.push("baayoo93@gmail.com")));
      });
    });
  });

  context("짧게 소개하기에 텍스트를 입력하면", () => {
    it("화면에 텍스트가 보인다.", async () => {
      const { getByTestId, getByDisplayValue } = renderUploadModal({
        isActive: true,
        handleClose,
      });
      const textArea = getByTestId("textarea");
      fireEvent.change(textArea, { target: { value: "짧은 소개글" } });
      expect(getByDisplayValue(/짧은 소개글/i)).toBeInTheDocument();
    });
  });
});
