import Link from "next/link";
import Profile from "../profile/profile";
import Text from "../typography/typography";
import style from "./profileSummary.module.css";

interface ProfileSummaryPropsType extends Author, User {
  className?: string;
}

const ProfileSummary = ({
  name,
  profileUrl,
  description,
  className = "",
  id,
}: ProfileSummaryPropsType) => {
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
        <Link href={`/user/${id}`}>
          <Text
            testid="profileSummaryName"
            variant="headline4"
            className={style.name}
          >
            {name}
          </Text>
        </Link>
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
