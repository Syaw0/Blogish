import path from "path";
import fs from "fs";

const removeProfileFile = async (id: string) => {
  try {
    const basePath = path.resolve(__dirname, "./../static/profile/");
    fs.rmSync(basePath + `/${id}`, { force: true });
    return { status: true, msg: "remove profile from storage" };
  } catch (err) {
    return { status: false, msg: "error during remove profile" };
  }
};

export default removeProfileFile;
