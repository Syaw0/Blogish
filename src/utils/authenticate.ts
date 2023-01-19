type AuthenticateType = "signup" | "signin";

const authenticate = async (type: AuthenticateType): Promise<FetchResponse> => {
  console.log(type);
  const resp = await fetch("");
  // const data = await resp.json();
  const data = {
    status: false,
    msg: "Error this email are used before",
  };
  return data;
};

const authenticateObject = {
  fetcher: authenticate,
  loaderMsg: "Wait until Authentication process Complete",
};

export default authenticateObject;
