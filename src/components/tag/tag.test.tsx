import Tag from "./tag";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockCallback = jest.fn(() => {});

const CustomParent = () => {
  return (
    <Tag
      name="someName"
      data-testid="someTestId"
      onClick={() => {
        mockCallback();
      }}
    />
  );
};

describe("Component Test : Tag", () => {
  beforeEach(() => {
    render(<CustomParent />);
  });

  it("check component render perfectly", () => {
    expect(screen.getByText("someName")).toBeInTheDocument();
  });

  it("click on the profile trigger event correctly", () => {
    fireEvent.click(screen.getByTestId("someTestId"));
    expect(mockCallback).toBeCalledTimes(1);
  });
});
