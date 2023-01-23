import Write from "../../components/pageComponents/write/write";
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { fakeUser } from "../../shared/fakePost";
import { Provider } from "react-redux";
import makeStore from "../../store/write/writeStore";

const WritePage = ({ ...params }: WritePagePropsType) => {
  return (
    <>
      <Head>
        <title>Write a Article</title>
        <meta name="description" content="blogish Write Page" />
      </Head>

      <Provider store={makeStore(params)}>
        <Write {...params} />
      </Provider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<WritePagePropsType>
> => {
  return {
    props: {
      isLogin: true,
      profileData: fakeUser,
      isEdit: false,
      postDetail: "",
      postHead: "",
      postSubhead: "",
    },
  };
};

export default WritePage;
