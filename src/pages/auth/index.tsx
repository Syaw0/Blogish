import Authenticate from "../../components/pageComponents/auth/authenticate";
import style from "../../styles/pagesStyle/auth.module.css";

const AuthenticatePage = () => {
  return (
    <div className={style.holder}>
      <Authenticate />
    </div>
  );
};

export default AuthenticatePage;
