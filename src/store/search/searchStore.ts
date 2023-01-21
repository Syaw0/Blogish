import {
  configureStore,
  createAction,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface SearchStateTypes {
  posts: PostType[];
  query: string;
}

const initState: SearchStateTypes = {
  posts: [],
  query: "",
};

const searchSlice = createSlice({
  initialState: initState,
  name: "searchStore",
  reducers: {
    addPost(preState, action: PayloadAction<PostType[]>) {
      preState.posts.push(...action.payload);
    },
  },
});

const makeStore = (initStates: PostType[], query: string | string[]) => {
  return configureStore({
    reducer: searchSlice.reducer,
    preloadedState: {
      posts: initStates,
      query: `${query}`,
    },
  });
};

export const searchStateAddPost = createAction<PostType[]>(
  searchSlice.actions.addPost.type
);

export type SearchState = typeof initState;

export default makeStore;
