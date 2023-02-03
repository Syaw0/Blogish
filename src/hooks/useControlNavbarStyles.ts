import { useEffect } from "react";

const useControlNavbarStyles = (divRef: any, isLogin: boolean) => {
  useEffect(() => {
    if (location.pathname != "/") {
      divRef.current.style.background = "var(--bg)";
      divRef.current.style.boxShadow = "var(--shadow2dp)";
    }
    let scrollEvent = () => {
      const y = divRef.current.offsetTop;
      if (y > 54) {
        divRef.current.style.background = "var(--bg)";
        divRef.current.style.boxShadow = "var(--shadow2dp)";
      } else if (location.pathname == "/") {
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
  }, [divRef, isLogin]);
};

export default useControlNavbarStyles;
