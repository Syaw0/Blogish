import IconLogo from "../../assets/icons/IconLogo";
import IconSearch from "../../assets/icons/iconSearch";
import IconWrite from "../../assets/icons/iconWrite";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Button from "../button/button";
import TextInput from "../input/text/textInput";
import Profile from "../profile/profile";
import style from "./navbar.module.css";

interface NavbarPropsType {
  isLogin: boolean;
  profileData?: ProfilePropsType;
}

const Navbar = ({ isLogin, profileData }: NavbarPropsType) => {
  const divRef: any = useRef(null);

  //TODO may is better write hook for this:

  useEffect(() => {
    let scrollEvent = () => {
      const y = divRef.current.offsetTop;
      if (y > 54) {
        divRef.current.style.background = "var(--bg)";
        divRef.current.style.boxShadow = "var(--shadow2dp)";
      } else {
        divRef.current.style.background = "var(--radial)";
        divRef.current.style.boxShadow = "none";
      }
    };

    if (!isLogin) {
      document.addEventListener("scroll", scrollEvent);
    } else {
      divRef.current.style.background = "var(--bg)";
      divRef.current.style.boxShadow = "var(--shadow2dp)";
    }
    return () => {
      document.removeEventListener("scroll", scrollEvent);
    };
  }, [isLogin]);

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchQuery(value);
  };

  const startSearch = () => {
    if (checkInput()) return;
    router.replace(`/search?query=${searchQuery}`);
  };

  const checkInput = () => {
    return searchQuery.trim() === "";
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      startSearch();
    }
  };

  return (
    <div ref={divRef} className={`${style.holder} `}>
      <div className={style.left}>
        <Link data-testid="navIconLogo" href={"/"}>
          <IconLogo className={style.logo} width="32" height="32" />
        </Link>

        <TextInput
          type="search"
          value={searchQuery}
          onChange={handleChangeInput}
          testId="navSearchBox"
          EndIcon={
            <IconSearch
              data-testid="navSearchBoxIcon"
              onClick={startSearch}
              width="18"
              height="18"
            />
          }
          placeholder={"Search through 9.000 articles..."}
          className={style.searchBox}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={style.right}>
        {/* // TODO write icon button component and reuse that */}
        <Link href="/search">
          <Button variant="shadow" className={style.searchButton}>
            <IconSearch width="20" height="20" />
          </Button>
        </Link>
        {!isLogin && (
          <>
            <Link data-testid="navAuthButton" href={"/auth"}>
              <Button variant="outlined" className={style.authButton}>
                Sign up / Sign in
              </Button>
            </Link>
          </>
        )}
        {isLogin && profileData != null && (
          <>
            <Link data-testid="navWriteButton" href={"/write"}>
              <Button
                StartIcon={IconWrite}
                variant="outlined"
                className={style.writeButton}
              >
                write
              </Button>
            </Link>

            <Link href="/write">
              <Button variant="shadow" className={style.writeIconButton}>
                <IconWrite width="20" height="20" />
              </Button>
            </Link>

            <Link data-testid="navProfile" href={"/me"}>
              <Profile
                alt={profileData.profileAlt}
                height={20}
                width={20}
                url={profileData.profileUrl}
              />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
