import IconEyeClose from "../../../assets/icons/iconEyeClose";
import IconSearch from "../../../assets/icons/iconSearch";
import Post from "../../../components/post/post";
import TextInput from "../../../components/input/text/textInput";
import style from "./home.module.css";

const Home = () => {
  return (
    <div className={style.holder}>
      <Post />
    </div>
  );
};
export default Home;
