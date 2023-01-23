import { configureStore, createSlice } from "@reduxjs/toolkit";

interface PostPageStatePropsType extends Omit<MainPagePropsType, "posts"> {}

const initState: PostPageStatePropsType = {
  isLogin: false,
};

const postSlice = createSlice({
  initialState: initState,
  name: "postStore",
  reducers: {},
});

const makeStore = ({
  isLogin,

  profileData,
}: PostPageStatePropsType) => {
  return configureStore({
    reducer: postSlice.reducer,
    preloadedState: {
      isLogin,
      profileData,
    },
  });
};

export type PostState = typeof initState;

export default makeStore;
