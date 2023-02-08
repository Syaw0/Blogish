import style from "./setting.module.css";
import Navbar from "../../../components/navbar/navbar";
import MultiSectionHorizontal from "../../..//components/layouts/multiSectionHorizontal/multiSectionHorizontal";
import IconUser from "../../..//assets/icons/iconUser";
import IconLock from "../../..//assets/icons/iconLock";
import GlobalSetting from "../../../components/globalSetting/globalSetting";

const Setting = ({ isLogin, profileData }: MainPagePropsType) => {
  return (
    <div className={style.holder}>
      <Navbar isLogin={isLogin} profileData={profileData} />

      <MultiSectionHorizontal
        layoutData={[
          {
            sectionName: "Information",
            component: <GlobalSetting />,
            Icon: IconUser,
          },
          {
            sectionName: "email and password",
            component: <div>email and password</div>,
            Icon: IconLock,
          },
        ]}
      />
    </div>
  );
};
export default Setting;
