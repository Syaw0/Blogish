import SettingProfile from "./settingProfile";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "../../store/setting/setting";
import { fakeUser } from "../../shared/fakePost";
import deleteProfile from "../../utils/deleteProfile";
import changeProfile from "../../utils/changeProfile";
import userEvent from "@testing-library/user-event";
jest.mock("../../utils/deleteProfile");
jest.mock("../../utils/changeProfile");
jest.mock("next/router", () => require("next-router-mock"));

const mockDeleteProf = deleteProfile as jest.Mock;
const mockChangeProf = changeProfile as jest.Mock;

const CustomParent = () => {
  return (
    <Provider store={makeStore({ isLogin: true, profileData: fakeUser })}>
      <SettingProfile />
    </Provider>
  );
};

describe("TEST COMPONENT : Setting Profile", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("profileSettingHolder")).toBeInTheDocument();
    expect(screen.getByTestId("profileSettingProfile")).toBeInTheDocument();
    expect(
      screen.getByTestId("profileSettingDeleteButton")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("profileSettingChangeButton")
    ).toBeInTheDocument();
    expect(screen.getByTestId("profileSettingFileInput")).toBeInTheDocument();
  });
  it("click on the deletion", async () => {
    render(<CustomParent />);
    mockDeleteProf.mockReturnValueOnce(
      new Promise((res) => res({ status: false }))
    );
    mockDeleteProf.mockReturnValueOnce(
      new Promise((res) => res({ status: true }))
    );
    fireEvent.click(screen.getByTestId("profileSettingDeleteButton"));
    expect(mockDeleteProf).toBeCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByTestId("profileSettingDeleteButton"));
    expect(mockDeleteProf).toBeCalledTimes(2);
    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toBeInTheDocument()
    );
  });

  it("click on the update", async () => {
    userEvent.setup();
    render(<CustomParent />);
    mockChangeProf.mockReturnValueOnce(
      new Promise((res) => res({ status: false }))
    );
    mockChangeProf.mockReturnValueOnce(
      new Promise((res) => res({ status: true }))
    );

    await waitFor(() =>
      userEvent.upload(
        screen.getByTestId("profileSettingFileInput"),
        new File([""], "name.png", { type: "image/png" })
      )
    );

    expect(mockChangeProf).toBeCalledTimes(1);

    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      userEvent.upload(
        screen.getByTestId("profileSettingFileInput"),
        new File([""], "name.png", { type: "image/png" })
      )
    );
    expect(mockChangeProf).toBeCalledTimes(2);
    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toBeInTheDocument()
    );
  });
});
