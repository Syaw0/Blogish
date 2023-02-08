import path from "path";

const updateProfileImage = async (file: any, userId: string) => {
  try {
    const basePath = path.resolve(__dirname, "./../static/profile/");
    await file.file.mv(basePath + `/${userId}`);
    return { status: true, msg: "ok" };
  } catch (err) {
    return { status: false, msg: "error during move file to static files" };
  }
};

export default updateProfileImage;
