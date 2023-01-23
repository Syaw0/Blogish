import {
  configureStore,
  createAction,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface WriteStateTypes {
  isEdit: boolean;
  postHead: string;
  postSubhead: string;
  postDetail: string;
}

const initState: WriteStateTypes = {
  isEdit: false,
  postDetail: "",
  postHead: "",
  postSubhead: "",
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
}: WritePagePropsType) => {
  return configureStore({
    reducer: writeSlice.reducer,
    preloadedState: {
      isEdit,
      postHead,
      postDetail,
      postSubhead,
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
