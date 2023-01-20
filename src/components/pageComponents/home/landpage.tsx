import IconBulb from "@/assets/icons/iconBulb";
import Button from "@/components/button/button";
import Text from "@/components/typography/typography";
import Link from "next/link";
import style from "./landpage.module.css";

const Landpage = ({}: any) => {
  return (
    <div className={`${style.holder} `}>
      <div>
        <h1 className={style.head}>
          Where IDEAS Are <br />
          Made 🌱️️
        </h1>
        <Text className={style.subhead} variant="headline4">
          a place to share your thoughts and ideas ...
        </Text>
        <Link href={"/auth"}>
          <Button className={style.button}>Start Writing</Button>
        </Link>
      </div>
      <div>
        <IconBulb width="450" height="450" />
      </div>
    </div>
  );
};

export default Landpage;
