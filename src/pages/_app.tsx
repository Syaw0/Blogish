import "@/styles/globals.css";
import { Arvo, Lato } from "@next/font/google";
import type { AppProps } from "next/app";
import style from "../styles/themeToken.module.css";

const arvo = Arvo({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic", "normal"],
  variable: "--font-head",
  preload: false,
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "100", "300", "900"],
  style: ["italic", "normal"],
  variable: "--font-sub",
  preload: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`
      ${lato.variable}
      ${arvo.variable} 
      ${style.color_light}
      ${style.transitionToken}
      ${style.shadows}
      ${style.font_sizes}
      ${style.line_height}`}
    >
      <Component {...pageProps} />
    </div>
  );
}
