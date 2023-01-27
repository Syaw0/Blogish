import BlogMD from "./blogMd";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const blogDetail = {
  header: "someHead",
  body: "someBody",
  description: "someDescription",
};
const CustomParent = () => {
  return <BlogMD {...blogDetail} />;
};

describe("Component Test : BlogMd", () => {
  it("check if given data is correct", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("blogMdHead")).toHaveTextContent(
      blogDetail.header
    );
    expect(screen.getByTestId("blogMdBody")).toHaveTextContent(blogDetail.body);
    expect(screen.getByTestId("blogMdSubhead")).toHaveTextContent(
      blogDetail.description
    );
  });
});
