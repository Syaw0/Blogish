const loadMorePosts = async (args: any): Promise<FetchResponse> => {
  const resp = await fetch(`/getMorePost?len=${args}`);
  const data = await resp.json();
  return data;
};

const loaderMsg = "Wait until load posts";

export default loadMorePosts;
export { loaderMsg };
