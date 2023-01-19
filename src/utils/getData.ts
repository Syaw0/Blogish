const getData = async () => {
  const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
  const result = await resp.json();
  return result;
};

const fetcherObject = {
  fetcher: getData,
  loaderMsg: "wait to authenticate your information",
};
export default fetcherObject;
