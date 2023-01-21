import {
  configureStore,
  createAction,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface HomeStateTypes {
  posts: PostType[];
}

const initState: HomeStateTypes = {
  posts: [],
};

const postSlice = createSlice({
  initialState: initState,
  name: "homeStore",
  reducers: {
    addPost(preState, action: PayloadAction<PostType[]>) {
      preState.posts.push(...action.payload);
    },
  },
});

const makeStore = (initStates: PostType[]) => {
  return configureStore({
    reducer: postSlice.reducer,
    preloadedState: {
      posts: initStates,
    },
  });
};

export const homeStateAddPost = createAction<PostType[]>(
  postSlice.actions.addPost.type
);

export type HomeState = typeof initState;

export default makeStore;
