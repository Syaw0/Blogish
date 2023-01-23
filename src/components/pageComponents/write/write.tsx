import Layout from "../../../components/layouts/multiSectionLayout/layout";
import style from "./write.module.css";
import WriteWrapper from "../../../components/writeWrapper/writeWrapper";
import Navbar from "../../../components/navbar/navbar";
import Button from "../../../components/button/button";

const Write = ({ isLogin, isEdit, profileData }: WritePagePropsType) => {
  const startPublishing = () => {
    console.log("publish");
  };
  return (
    <div className={style.holder}>
      <Navbar profileData={profileData} isLogin={isLogin} />
      <Layout
        className={style.layout}
        topNavExtraComponent={
          <Button className={style.topRightButton} onClick={startPublishing}>
            {isEdit ? "Publish Changes" : "Publish"}
          </Button>
        }
        layoutData={[
          {
            sectionName: "Write",
            component: <WriteWrapper />,
          },
          {
            sectionName: "Preview",
            component: <div>preview</div>,
          },
        ]}
      />
    </div>
  );
};

export default Write;
