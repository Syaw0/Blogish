import IconBulb from "../../assets/icons/iconBulb";
import Button from "../../components/button/button";
import Text from "../../components/typography/typography";
import Link from "next/link";
import style from "./landpage.module.css";

const Landpage = ({}: any) => {
  return (
    <div className={`${style.holder} `}>
      <div className={style.left}>
        <h1 data-testid="landpageHead" className={style.head}>
          Where IDEAS Are Made 🌱️️
        </h1>
        <Text
          testid="landpageSubhead"
          className={style.subhead}
          variant="headline4"
        >
          a place to share your thoughts and ideas ...
        </Text>
        <Link data-testid="landpageButton" href={"/auth"}>
          <Button className={style.button}>Start Writing</Button>
        </Link>
      </div>
      <div className={style.right}>
        <IconBulb
          data-testid="landpageIcon"
          className={style.icon}
          width="450"
          height="450"
        />
      </div>
    </div>
  );
};

export default Landpage;
