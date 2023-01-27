import WritePage from "../../pages/write/index";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { fakePost } from "../../shared/fakePost";
import publishPost from "../../utils/publishPost";

jest.mock("../../utils/publishPost");
jest.mock("../../../server/util/checkSession.ts", () => jest.fn());
jest.mock("../../../db/util/getPost.ts", () => jest.fn(() => {}));
jest.mock("../../../db/util/getPostContent.ts", () => jest.fn(() => {}));
jest.mock("next/router", () => require("next-router-mock"));

const mockPublish = publishPost as jest.Mock;

mockPublish.mockReturnValue(
  new Promise((res) => res({ status: true, msg: "" }))
);

const postDetail = {
  isEdit: false,
  postDetail: "",
  postHead: "",
  postSubhead: "",
  id: "1",
};

const postDetail2 = {
  isEdit: true,
  postDetail: "someDetail",
  postHead: "someHead",
  postSubhead: "someSubhead",
  id: "1",
};

describe("Test Page : Write!", () => {
  it("let see if components mount correctly", () => {
    render(
      <WritePage {...postDetail} isLogin={true} profileData={fakePost.author} />
    );
    expect(screen.getByTestId("layoutMultipleTop")).toBeInTheDocument();
    expect(screen.getByTestId("layoutMultipleBottom")).toBeInTheDocument();
    expect(screen.getByTestId("publishButton")).toBeInTheDocument();
    expect(screen.getByTestId("Preview")).toBeInTheDocument();
    expect(screen.getByTestId("Write")).toBeInTheDocument();
    expect(screen.getByTestId("writeComponentHeadInput")).toBeInTheDocument();
    expect(screen.getByTestId("layoutMultipleHolder")).toBeInTheDocument();

    expect(
      screen.getByTestId("writeComponentSubHeadInput")
    ).toBeInTheDocument();
    expect(screen.getByTestId("writeComponentBodyInput")).toBeInTheDocument();
    expect(screen.getByTestId("Write")).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("navProfile")).toBeInTheDocument();
    expect(screen.getByTestId("navWriteButton")).toBeInTheDocument();
  });

  it("if inputs are empty when click on the publish show error", async () => {
    render(
      <WritePage {...postDetail} isLogin={true} profileData={fakePost.author} />
    );
    fireEvent.click(screen.getByTestId("publishButton"));

    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
  });

  it("if we are editing page so show edit data ", async () => {
    render(
      <WritePage
        {...postDetail2}
        isLogin={true}
        profileData={fakePost.author}
      />
    );
    const headInput: any = screen.getByTestId("writeComponentHeadInput");
    const bodyInput: any = screen.getByTestId("writeComponentBodyInput");
    const subheadInput: any = screen.getByTestId("writeComponentSubHeadInput");

    expect(headInput.value).toEqual(postDetail2.postHead);
    expect(bodyInput.value).toEqual(postDetail2.postDetail);
    expect(subheadInput.value).toEqual(postDetail2.postSubhead);
  });

  describe("when inputs are filled", () => {
    beforeEach(() => {
      render(
        <WritePage
          {...postDetail}
          isLogin={true}
          profileData={fakePost.author}
        />
      );
      fireEvent.change(screen.getByTestId("writeComponentHeadInput"), {
        target: { value: "head" },
      });
      fireEvent.change(screen.getByTestId("writeComponentSubHeadInput"), {
        target: { value: "subhead" },
      });
      fireEvent.change(screen.getByTestId("writeComponentBodyInput"), {
        target: { value: "detail" },
      });
    });
    it("if we click on the publish loader show up and if server response is ok show success msg", async () => {
      fireEvent.click(screen.getByTestId("publishButton"));
      await waitFor(() =>
        expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
      );
      await waitFor(() =>
        expect(screen.getByTestId("successMessage")).toBeInTheDocument()
      );
    });
    it("if we click on the publish if server response is not ok show error msg", async () => {
      mockPublish.mockReturnValue(
        new Promise((res) => res({ status: false, msg: "" }))
      );

      fireEvent.click(screen.getByTestId("publishButton"));
      await waitFor(() =>
        expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
      );
      await waitFor(() =>
        expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
      );
    });
  });
});
