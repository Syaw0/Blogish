import {
  configureStore,
  createAction,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface HomeStateTypes {
  posts: PostType[];
  isLogin: boolean;
  profileData?: ProfilePropsType;
}

const initState: HomeStateTypes = {
  posts: [],
  isLogin: false,
};

const postSlice = createSlice({
  initialState: initState,
  name: "homeStore",
  reducers: {
    addPost(preState, action: PayloadAction<PostType[]>) {
      return {
        ...preState,
        posts: [...preState.posts, ...action.payload],
      };
    },
  },
});

const makeStore = ({ isLogin, posts, profileData }: HomeStateTypes) => {
  return configureStore({
    reducer: postSlice.reducer,
    preloadedState: {
      posts: posts.slice(0, posts.length),
      isLogin,
      profileData,
    },
  });
};

export const homeStateAddPost = createAction<PostType[]>(
  postSlice.actions.addPost.type
);

export type HomeState = typeof initState;

export default makeStore;
