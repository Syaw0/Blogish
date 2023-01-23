import Home from "../components/pageComponents/home/home";
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { fakePost } from "../shared/fakePost";
import { Provider } from "react-redux";
import makeStore from "../store/home/homeStore";

export default function HomePage({ ...params }: MainPagePropsType) {
  return (
    <>
      <Head>
        <title>Blogish</title>
        <meta name="description" content="blogish Home Page" />
      </Head>

      <Provider store={makeStore(params)}>
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
  GetServerSidePropsResult<MainPagePropsType>
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
      profileData: { ...fakePost.author },
    },
  };
};
