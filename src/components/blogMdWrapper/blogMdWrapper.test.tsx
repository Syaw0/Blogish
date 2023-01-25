import BlogMDWrapper from "./blogMdWrapper";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "../../store/write/writeStore";

const blogDetail = {
  isEdit: true,
  postHead: "head",
  postDetail: "detail",
  postSubhead: "subhead",
  isLogin: true,
  id: "1",
};
const CustomParent = () => {
  return (
    <Provider store={makeStore(blogDetail)}>
      <BlogMDWrapper />
    </Provider>
  );
};

describe("Component Test : BlogMDWrapper", () => {
  it("check if given data is correct", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("blogMdHead")).toHaveTextContent(
      blogDetail.postHead
    );
    expect(screen.getByTestId("blogMdBody")).toHaveTextContent(
      blogDetail.postDetail
    );
    expect(screen.getByTestId("blogMdSubhead")).toHaveTextContent(
      blogDetail.postSubhead
    );
  });
});
