const getData = async () => {
  const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
  const result = await resp.json();
  return result;
};

export default getData;
