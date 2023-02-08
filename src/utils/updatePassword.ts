import { SHA256 } from "crypto-js";

const updatePassword = async (
  changeData: [x: string, y: string, z: string]
) => {
  const oldPassword = SHA256(changeData[0]).toString();
  const newPassword = SHA256(changeData[1]).toString();
  const userId = changeData[2];
  const resp = await fetch("/updatePassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, oldPassword, newPassword }),
  });
  const data = await resp.json();
  return data;
};

export const loaderMsg = "please wait until server response.";
export default updatePassword;
