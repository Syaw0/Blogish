import WriteWrapper from "./writeWrapper";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "../../store/write/writeStore";
import { fakeUser } from "../../shared/fakePost";

const CustomParent = () => {
  return (
    <Provider
      store={makeStore({
        isEdit: true,
        isLogin: true,
        postDetail: "",
        postHead: "",
        postSubhead: "",
        profileData: fakeUser,
      })}
    >
      <WriteWrapper />
    </Provider>
  );
};

describe("Component Test : Input Text", () => {
  it("check if given data is correct", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("writeComponentHeadInput")).toBeInTheDocument();
    expect(
      screen.getByTestId("writeComponentSubHeadInput")
    ).toBeInTheDocument();
    expect(screen.getByTestId("writeComponentBodyInput")).toBeInTheDocument();
  });
});
