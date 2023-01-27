import {
  configureStore,
  createAction,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

const initState: WritePagePropsType = {
  isEdit: false,
  postDetail: "",
  postHead: "",
  postSubhead: "",
  isLogin: false,
  id: "",
};

const writeSlice = createSlice({
  initialState: initState,
  name: "writeStore",
  reducers: {
    editHead(preState, action: PayloadAction<string>) {
      return {
        ...preState,
        postHead: action.payload,
      };
    },

    editBody(preState, action: PayloadAction<string>) {
      return {
        ...preState,
        postDetail: action.payload,
      };
    },

    editSubHead(preState, action: PayloadAction<string>) {
      return {
        ...preState,
        postSubhead: action.payload,
      };
    },
  },
});

const makeStore = ({
  isEdit,
  postDetail,
  postHead,
  postSubhead,
  isLogin,
  profileData,
  id,
}: WritePagePropsType) => {
  return configureStore({
    reducer: writeSlice.reducer,
    preloadedState: {
      isEdit,
      postHead,
      postDetail,
      postSubhead,
      isLogin,
      profileData,
      id,
    },
  });
};

export const writeStateEditHead = createAction<string>(
  writeSlice.actions.editHead.type
);

export const writeStateEditSubHead = createAction<string>(
  writeSlice.actions.editSubHead.type
);

export const writeStateEditBody = createAction<string>(
  writeSlice.actions.editBody.type
);

export type WriteState = typeof initState;

export default makeStore;
