import WriteComponent from "./write";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChangeEvent, useState } from "react";

const CustomParent = () => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInp((s) => ({ ...s, [name]: value }));
  };

  const [inp, setInp] = useState({
    bodyInput: "",
    headInput: "",
    subHeadInput: "",
  });
  return (
    <WriteComponent
      bodyValue={inp.bodyInput}
      headValue={inp.headInput}
      subHeadValue={inp.subHeadInput}
      onChange={changeHandler}
    />
  );
};

describe("Component Test : Write component", () => {
  it("check if given data is correct", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("writeComponentHeadInput")).toBeInTheDocument();
    expect(
      screen.getByTestId("writeComponentSubHeadInput")
    ).toBeInTheDocument();
    expect(screen.getByTestId("writeComponentBodyInput")).toBeInTheDocument();
  });

  it("check if change inputs are work on inputs", () => {
    render(<CustomParent />);
    const headInput: HTMLInputElement = screen.getByTestId(
      "writeComponentHeadInput"
    );
    const subHeadInput: HTMLInputElement = screen.getByTestId(
      "writeComponentSubHeadInput"
    );
    const bodyInput: HTMLInputElement = screen.getByTestId(
      "writeComponentBodyInput"
    );
    fireEvent.change(headInput, { target: { value: "some head" } });
    expect(headInput.value).toEqual("some head");

    fireEvent.change(subHeadInput, { target: { value: "some subhead" } });
    expect(subHeadInput.value).toEqual("some subhead");

    fireEvent.change(bodyInput, { target: { value: "some body" } });
    expect(bodyInput.value).toEqual("some body");
  });
});
