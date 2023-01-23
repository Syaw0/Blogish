import { configureStore, createSlice } from "@reduxjs/toolkit";

interface userPageStatePropsType extends Omit<MainPagePropsType, "posts"> {}

const initState: userPageStatePropsType = {
  isLogin: false,
};

const userSlice = createSlice({
  initialState: initState,
  name: "userStore",
  reducers: {},
});

const makeStore = ({
  isLogin,

  profileData,
}: userPageStatePropsType) => {
  return configureStore({
    reducer: userSlice.reducer,
    preloadedState: {
      isLogin,
      profileData,
    },
  });
};

export type UserState = typeof initState;

export default makeStore;
