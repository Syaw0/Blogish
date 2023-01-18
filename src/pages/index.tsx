import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Blogish</title>
        <meta name="description" content="blogish home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="holder">
        <h1>BLOGISH</h1>
        <h1>BLOG APPLICATION</h1>
      </div>
    </>
  );
}
