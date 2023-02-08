import IconLogo from "../../assets/icons/IconLogo";
import IconSearch from "../../assets/icons/iconSearch";
import IconWrite from "../../assets/icons/iconWrite";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useRef, useState } from "react";
import Button from "../button/button";
import TextInput from "../input/text/textInput";
import Profile from "../profile/profile";
import style from "./navbar.module.css";
import IconLogout from "../../assets/icons/iconLogout";
import logoutAndRemoveSession from "../../utils/logout";
import SwitchTheme from "../switchTheme/switchTheme";
import useControlNavbarStyles from "../../hooks/useControlNavbarStyles";
import Text from "../typography/typography";
import useOutsideClickHandler from "../../hooks/useOutsideClickHandle";

interface NavbarPropsType {
  isLogin: boolean;
  profileData?: ProfilePropsType;
}

const Navbar = ({ isLogin, profileData }: NavbarPropsType) => {
  const menuRef: any = useRef(null);
  const divRef: any = useRef(null);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  useControlNavbarStyles(divRef, isLogin);

  const logout = async () => {
    const data = await logoutAndRemoveSession(profileData!.id);
    if (data.status) {
      if (location.pathname == "/") {
        return router.reload();
      }
      router.replace("/");
    }
  };

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchQuery(value);
  };

  const startSearch = () => {
    if (checkInput()) return;
    router.replace(`/search?query=${searchQuery}`);
    if (location.pathname == "/search") {
      router.reload();
    }
  };

  const checkInput = () => {
    return searchQuery.trim() === "";
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      startSearch();
    }
  };

  const navigateToWritePage = () => {
    if (!/\/write/.test(location.pathname)) {
      router.replace("/write");
    }
  };

  const handleNavMenu = () => {
    setIsNavMenuOpen((s) => !s);
  };
  useOutsideClickHandler(menuRef, setIsNavMenuOpen);

  return (
    <div data-testid="navbar" ref={divRef} className={`${style.holder} `}>
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
        <SwitchTheme />
        <Button
          onClick={() => {
            if (location.pathname != "/search") {
              router.replace("/search");
            }
          }}
          variant="shadow"
          className={style.searchButton}
        >
          <IconSearch width="20" height="20" />
        </Button>
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
            <Button
              testid="navWriteButton"
              onClick={navigateToWritePage}
              StartIcon={IconWrite}
              variant="outlined"
              className={style.writeButton}
            >
              write
            </Button>

            <Button
              testid="navWriteIconButton"
              onClick={navigateToWritePage}
              variant="shadow"
              className={style.writeIconButton}
            >
              <IconWrite width="20" height="20" />
            </Button>

            <div
              data-testid="navbarMenuHolder"
              ref={menuRef}
              onClick={handleNavMenu}
              className={style.menuHolder}
            >
              <Profile
                data-testid="navProfile"
                alt={profileData.name}
                height={20}
                width={20}
                url={profileData.profileUrl}
              />
              {isNavMenuOpen && (
                <div data-testid="navbarMenu" className={style.menu}>
                  <Link
                    data-testid="navbarMenuItemProfile"
                    href={`/user/${profileData.id}`}
                  >
                    <Text>Profile</Text>
                  </Link>
                  <Text
                    testid="navbarMenuItemWrite"
                    onClick={navigateToWritePage}
                  >
                    Write
                  </Text>
                  <Link data-testid="navbarMenuItemSetting" href={"/setting"}>
                    <Text>Setting</Text>
                  </Link>

                  <Text testid="navbarMenuItemLogout" onClick={logout}>
                    Logout
                  </Text>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
