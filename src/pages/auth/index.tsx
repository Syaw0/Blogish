import getTheme from "../../utils/getTheme";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import Authenticate from "../../components/pageComponents/auth/authenticate";

const AuthenticatePage = () => {
  return (
    <>
      <Head>
        <title>Authentication</title>
        <meta name="description" content={`blogish Authentication Page`} />
      </Head>
      <Authenticate />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}): Promise<GetServerSidePropsResult<any>> => {
  const theme = getTheme(req, res);
  return {
    props: {
      theme,
    },
  };
};

export default AuthenticatePage;
