const updateEmail = async (changeData: [x: string, y: string, z: string]) => {
  const newEmail = changeData[0];
  const userId = changeData[1];
  const resp = await fetch("/updateEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, newEmail }),
  });
  const data = await resp.json();
  return data;
};

export const loaderMsg = "please wait until server response.";
export default updateEmail;
