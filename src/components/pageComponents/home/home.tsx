import IconEyeClose from "../../../assets/icons/iconEyeClose";
import IconSearch from "../../../assets/icons/iconSearch";
import Post from "../../../components/post/post";
import style from "./home.module.css";
import { fakePost } from "@/shared/fakePost";

const Home = () => {
  return (
    <div className={style.holder}>
      <Post {...fakePost} />
    </div>
  );
};
export default Home;
