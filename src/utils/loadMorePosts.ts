const loadMorePosts = async (args: [s: string]): Promise<FetchResponse> => {
  const len = args[0];
  const resp = await fetch(`/getMorePost?len=${len}`);
  const data = await resp.json();
  return data;
};

const loaderMsg = "Wait until load posts";

export default loadMorePosts;
export { loaderMsg };
