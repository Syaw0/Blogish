import Home from "../components/pageComponents/home/home";
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { fakePost } from "../shared/fakePost";
import { Provider } from "react-redux";
import makeStore from "../store/home/homeStore";
import getPostList from "../../db/util/getPostList";

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

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<MainPagePropsType>
> => {
  const posts = await getPostList(0);

  if (!posts.status) {
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }

  return {
    props: {
      isLogin: true,
      posts: posts.data,
      profileData: { ...fakePost.author },
    },
  };
};
