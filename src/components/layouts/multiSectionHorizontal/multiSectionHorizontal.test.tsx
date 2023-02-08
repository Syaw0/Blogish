import MultiSectionHorizontal from "./multiSectionHorizontal";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import IconLock from "../../../assets/icons/iconLock";

const fakeData = [
  {
    sectionName: "Write",
    component: <div>section1 Component</div>,
    Icon: IconLock,
  },
  {
    sectionName: "Preview",
    component: <div>section2 Component</div>,
    Icon: IconLock,
  },
  {
    sectionName: "section3",
    component: <div>section3 Component</div>,
    Icon: IconLock,
  },
  {
    sectionName: "section4",
    component: <div>section4 Component</div>,
    Icon: IconLock,
  },
];

const CustomParent = () => {
  return <MultiSectionHorizontal layoutData={fakeData} />;
};

describe("Component Test : Layout-Multiple Section", () => {
  it("check if given data is correct", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("layoutHolder")).toBeInTheDocument();
    expect(screen.getByTestId("layoutLeft")).toBeInTheDocument();
    expect(screen.getByTestId("layoutMultipleHolder")).toBeInTheDocument();
    expect(screen.getByTestId("layoutMultipleTop")).toBeInTheDocument();
    expect(screen.getByTestId("layoutMultipleBottom")).toBeInTheDocument();
    expect(screen.getByTestId("layoutRight")).toBeInTheDocument();
    expect(
      screen.getAllByTestId(fakeData[0].sectionName).length
    ).toBeGreaterThan(1);
    expect(
      screen.getAllByTestId(fakeData[1].sectionName).length
    ).toBeGreaterThan(1);
    expect(
      screen.getAllByTestId(fakeData[2].sectionName).length
    ).toBeGreaterThan(1);
    expect(
      screen.getAllByTestId(fakeData[3].sectionName).length
    ).toBeGreaterThan(1);
  });
});
