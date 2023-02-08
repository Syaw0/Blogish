// import AuthenticateSetting from "./authenticateSetting";
// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { Provider } from "react-redux";
// import makeStore from "../../store/setting/setting";

// jest.mock("next/router", () => require("next-router-mock"));

// const CustomParent = () => {
//   return (
//     <Provider store={makeStore({})}>
//       <AuthenticateSetting />
//     </Provider>
//   );
// };

// describe("TEST COMPONENT : GlobalSetting ", () => {
//   it("its render properly", () => {
//     render(<CustomParent />);
//     expect(screen.getByTestId("globalSettingHolder")).toBeInTheDocument();
//     expect(screen.getByTestId("profileSettingHolder")).toBeInTheDocument();
//     expect(screen.getByTestId("settingNameHolder")).toBeInTheDocument();
//   });
// });
