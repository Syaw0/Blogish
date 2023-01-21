import Home from "../components/pageComponents/home/home";
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { fakePost } from "../shared/fakePost";
import { Provider } from "react-redux";
import makeStore from "../store/home/homeStore";

export default function HomePage({ ...params }: HomePagePropsType) {
  return (
    <>
      <Head>
        <title>Blogish</title>
        <meta name="description" content="blogish home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Provider store={makeStore(params.posts != null ? params.posts : [])}>
        <Home {...params} />
      </Provider>
    </>
  );
}

let posts = [fakePost, fakePost, fakePost, fakePost, fakePost, fakePost];
posts = posts.map((p, i) => {
  return {
    ...p,
    id: `${i}`,
  };
});

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<HomePagePropsType>
> => {
  // here we must check session and send this props to component
  // also we must fetch for data in database
  // no fetch just query to db
  // * we must query to db for 10 or more posts
  // * then from client when scroll reach to the end fetch for more posts!

  return {
    props: {
      isLogin: true,
      posts,
      profileData: { ...fakePost.profile },
    },
  };
};
