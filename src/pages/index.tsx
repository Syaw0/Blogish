import Home from "../components/pageComponents/home/home";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Blogish</title>
        <meta name="description" content="blogish home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home isLogin={false} />
    </>
  );
}
