const updateNameAndDescription = async (
  updateData: [x: string, y: string, z: string]
) => {
  const name = updateData[0];
  const description = updateData[1];
  const userId = updateData[2];
  const resp = await fetch("/updateNameAndDescription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, name, description }),
  });
  const data = await resp.json();
  return data;
};

export const loaderMsg = "please wait until server response.";
export default updateNameAndDescription;
