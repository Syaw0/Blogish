import Home from "../components/pageComponents/home/home";
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { Provider } from "react-redux";
import makeStore from "../store/home/homeStore";
import getPostList from "../../db/util/getPostList";
import checkSession from "../../server/util/checkSession";
import getTheme from "../utils/getTheme";

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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}): Promise<GetServerSidePropsResult<MainPagePropsType>> => {
  const props = {
    isLogin: false,
    profileData: {
      name: "",
      profileUrl: "",
      id: "",
    },
  };
  const isLogged = await checkSession(req.cookies);
  if (isLogged.status) {
    props.isLogin = true;
    props.profileData = isLogged.data;
  }
  const posts = await getPostList(0);

  if (!posts.status) {
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }

  const theme = getTheme(req, res);

  return {
    props: {
      theme,
      posts: posts.data,
      ...props,
    },
  };
};
