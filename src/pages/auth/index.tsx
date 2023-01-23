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

export default AuthenticatePage;
