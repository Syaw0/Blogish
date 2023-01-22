import Profile from "../profile/profile";
import Text from "../typography/typography";
import style from "./profileSummary.module.css";

type ProfileSummaryPropsType = Omit<
  UserPagePropsType,
  "posts" | "isLogin" | "profileData"
>;

const ProfileSummary = ({ user }: ProfileSummaryPropsType) => {
  const { name, profile, description } = user;
  return (
    <div className={style.holder}>
      <Profile
        className={style.image}
        alt={profile.profileAlt}
        url={profile.profileUrl}
        height={100}
        width={100}
      />
      <Text variant="headline4" className={style.name}>
        {name}
      </Text>
      <Text variant="subhead1" className={style.description}>
        {description}
      </Text>
    </div>
  );
};

export default ProfileSummary;
