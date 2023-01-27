const publishPost = async ({
  postHead,
  postSubhead,
  postDetail,
  id,
  profileData,
}: any): Promise<FetchResponse> => {
  const query = id != null ? `?edit=true&id=${id}` : "";
  const resp = await fetch(`/publish${query}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postDetail,
      postHead,
      postSubhead,
      author: profileData.id,
      id,
    }),
  });
  const data = await resp.json();

  return data;
};

const loaderMsg = "Wait to publish your post";

export default publishPost;
export { loaderMsg };
