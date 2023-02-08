import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { Provider } from "react-redux";
import getPostList from "../../../db/util/getPostList";
import checkSession from "../../../server/util/checkSession";
import getTheme from "../../utils/getTheme";
import Setting from "../../components/pageComponents/setting/setting";
import makeStore, { SettingState } from "../../store/setting/setting";

export default function SettingPage(params: MainPagePropsType) {
  return (
    <>
      <Head>
        <title>Setting</title>
        <meta name="description" content="blogish Setting Page" />
      </Head>

      <Provider store={makeStore(params)}>
        <Setting {...params} />
      </Provider>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}): Promise<GetServerSidePropsResult<SettingState & { theme: string }>> => {
  const props = {
    isLogin: false,
    profileData: {
      name: "",
      profileUrl: "",
      id: "",
      description: "",
    },
  };
  const isLogged = await checkSession(req.cookies);
  if (isLogged.status) {
    props.isLogin = true;
    props.profileData = isLogged.data;
  }

  const theme: string = getTheme(req, res) as string;

  return {
    props: {
      theme,
      ...props,
    },
  };
};
