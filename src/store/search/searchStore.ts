import {
  configureStore,
  createAction,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

const initState: SearchPagePropsType = {
  posts: [],
  query: "",
  isLogin: false,
};

const searchSlice = createSlice({
  initialState: initState,
  name: "searchStore",
  reducers: {
    addPost(preState, action: PayloadAction<PostType[]>) {
      return {
        ...preState,
        posts: [...preState.posts, ...action.payload],
      };
    },
  },
});

const makeStore = ({
  isLogin,
  posts,
  query,
  profileData,
}: SearchPagePropsType) => {
  return configureStore({
    reducer: searchSlice.reducer,
    preloadedState: {
      posts,
      isLogin,
      profileData,
      query,
    },
  });
};

export const searchStateAddPost = createAction<PostType[]>(
  searchSlice.actions.addPost.type
);

export type SearchState = typeof initState;

export default makeStore;
