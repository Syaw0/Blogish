const publishPost = async (): Promise<FetchResponse> => {
  const resp = await fetch("");
  // const data = await resp.json();
  const data = {
    status: true,
    msg: "successfully publish post",
  };
  return data;
};

const loaderMsg = "Wait to publish your post";

export default publishPost;
export { loaderMsg };
