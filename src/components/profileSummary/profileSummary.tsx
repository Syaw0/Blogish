import Profile from "../profile/profile";
import Text from "../typography/typography";
import style from "./profileSummary.module.css";

type ProfileSummaryPropsType = Omit<
  UserPagePropsType,
  "posts" | "isLogin" | "profileData"
> & {
  className?: string;
};

const ProfileSummary = ({ user, className = "" }: ProfileSummaryPropsType) => {
  const { name, profileUrl, description } = user;
  return (
    <div
      data-testid="profileSummaryHolder"
      className={`${style.holder}  ${className}`}
    >
      <Profile
        data-testid="profileSummaryProfile"
        className={style.image}
        alt={name}
        url={profileUrl}
        height={100}
        width={100}
      />
      <div>
        <Text
          testid="profileSummaryName"
          variant="headline4"
          className={style.name}
        >
          {name}
        </Text>
        <Text
          testid="profileSummaryDescription"
          variant="subhead1"
          className={style.description}
        >
          {description}
        </Text>
      </div>
    </div>
  );
};

export default ProfileSummary;