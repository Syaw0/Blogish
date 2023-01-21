import IconSearch from "../../../assets/icons/iconSearch";
import TextInput from "../../../components/input/text/textInput";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import Layout from "../../../components/layout/layout";
import LazyPostSearchHolder from "../../../components/lazyPostSearchHolder/lazyPostHolder";
import Navbar from "../../../components/navbar/navbar";
import TrendTags from "../../../components/trendTags/trendTag";
import { useSearchSelector } from "../../../store/search/searchStoreHooks";
import style from "./search.module.css";

const Search = ({ isLogin, profileData }: MainPagePropsType) => {
  const router = useRouter();
  const query = useSearchSelector((s) => s.query);
  const [searchInput, setSearchInput] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchInput(value);
  };
  const startSearch = () => {
    if (searchInput.trim() == "") return;
    router.replace(`/search?query=${searchInput}`);
    router.reload();
  };
  return (
    <div className={style.holder}>
      <Navbar
        isLogin={isLogin}
        profileData={{
          profileAlt: profileData != null ? profileData.profileAlt : "",
          profileUrl: profileData != null ? profileData.profileUrl : "",
        }}
      />
      <Layout
        leftSide={
          <div className={style.leftHolder}>
            <TextInput
              className={style.searchBox}
              value={searchInput}
              onChange={handleInputChange}
              placeholder={"Search Through 9.000 Articles..."}
              type="search"
              testId="searchSearchBox"
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  startSearch();
                }
              }}
              EndIcon={
                <IconSearch onClick={startSearch} width="20" height="20" />
              }
            />
            <LazyPostSearchHolder
              headText={
                query == ""
                  ? "Search To Find Your interest"
                  : `Result For : ${query}`
              }
            />
          </div>
        }
        rightSide={<TrendTags tags={["Programming", "Nature", "socket"]} />}
      />
    </div>
  );
};

export default Search;
