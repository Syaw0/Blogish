import { fakePost } from "../shared/fakePost";

const loadMorePosts = async (): Promise<FetchResponse> => {
  const resp = await fetch("");
  // const data = await resp.json();
  const data = {
    status: true,
    msg: "Error this email are used before",
    data: {
      posts: [fakePost, fakePost, fakePost],
    },
  };
  return data;
};

const loaderMsg = "Wait until load posts";

export default loadMorePosts;
export { loaderMsg };
