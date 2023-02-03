import User from "../../../components/pageComponents/user/user";
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { fakePost } from "../../../shared/fakePost";
import { Provider } from "react-redux";
import makeStore from "../../../store/user/userStore";
import getUser from "../../../../db/util/getUser";
import getUserPosts from "../../../../db/util/getUserPosts";
import checkSession from "../../../../server/util/checkSession";
import getTheme from "../../../utils/getTheme";
const UserPage = ({ ...params }: UserPagePropsType) => {
  const { name } = params.user;
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content={`blogish User Page ${name}`} />
      </Head>

      <Provider store={makeStore(params)}>
        <User {...params} />
      </Provider>
    </>
  );
};

let posts: PostType[] = [];
for (let i = 0; i != 25; i++) {
  posts.push({ ...fakePost });
}

posts.map((p: any, i) => {
  p.id = `post-${i + 1}`;
  return p;
});

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
}): Promise<GetServerSidePropsResult<UserPagePropsType>> => {
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
  const user = await getUser(params && params.id);
  const posts = await getUserPosts(params && params.id);

  if (!user.status || !posts.status) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  const theme = getTheme(req, res);
  return {
    props: {
      theme,
      ...props,
      posts: posts.data,
      user: user.data,
    },
  };
};

export default UserPage;
