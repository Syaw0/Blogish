import "@/styles/globals.css";
import type { AppProps } from "next/app";
import style from "../styles/themeToken.module.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={style.color_light}>
      <Component {...pageProps} />
    </div>
  );
}
