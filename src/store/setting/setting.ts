import { configureStore, createSlice } from "@reduxjs/toolkit";

interface SettingStateTypes {
  isLogin: boolean;
  profileData: ProfilePropsType;
}

const initState: SettingStateTypes = {
  isLogin: false,
  profileData: {
    id: "",
    name: "",
    profileUrl: "",
    description: "",
  },
};

const settingSlice = createSlice({
  initialState: initState,
  name: "settingStore",
  reducers: {},
});

const makeStore = (params: Partial<SettingStateTypes>) => {
  return configureStore({
    reducer: settingSlice.reducer,
    preloadedState: {
      ...initState,
      ...params,
    },
  });
};

export type SettingState = typeof initState;

export default makeStore;
