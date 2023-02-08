import SettingName from "./settingName";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "../../store/setting/setting";
import { fakeUser } from "../../shared/fakePost";
import updateNameAndDescription from "../../utils/updateNameAndDescription";

jest.mock("../../utils/updateNameAndDescription");
jest.mock("next/router", () => require("next-router-mock"));

const mockUpdateNameAndDescription = updateNameAndDescription as jest.Mock;

const CustomParent = () => {
  return (
    <Provider store={makeStore({ isLogin: true, profileData: fakeUser })}>
      <SettingName />
    </Provider>
  );
};

describe("TEST COMPONENT : Setting Name", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("settingNameHolder")).toBeInTheDocument();
    expect(screen.getByTestId("settingNameInput")).toBeInTheDocument();
    expect(screen.getByTestId("settingDescription")).toBeInTheDocument();
    expect(screen.getByTestId("settingNameUpdateButton")).toBeInTheDocument();
  });
  it("click on the deletion", async () => {
    render(<CustomParent />);
    mockUpdateNameAndDescription.mockReturnValueOnce(
      new Promise((res) => res({ status: false }))
    );
    mockUpdateNameAndDescription.mockReturnValueOnce(
      new Promise((res) => res({ status: true }))
    );
    fireEvent.click(screen.getByTestId("settingNameUpdateButton"));
    expect(mockUpdateNameAndDescription).toBeCalledTimes(0);
    // because inputs are same as before
    // this also return error and if inputs are empty will return error
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();

    fireEvent.change(screen.getByTestId("settingNameInput"), {
      target: { value: "bealbela" },
    });

    fireEvent.click(screen.getByTestId("settingNameUpdateButton"));
    expect(mockUpdateNameAndDescription).toBeCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByTestId("settingNameUpdateButton"));
    expect(mockUpdateNameAndDescription).toBeCalledTimes(2);
    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toBeInTheDocument()
    );
  });
});
