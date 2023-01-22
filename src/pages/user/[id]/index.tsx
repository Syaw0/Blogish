import User from "../../../components/pageComponents/user/user";
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { fakePost } from "../../../shared/fakePost";

const UserPage = ({ ...params }: UserPagePropsType) => {
  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="blogish User App" />
      </Head>

      <User {...params} />
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
}): Promise<GetServerSidePropsResult<UserPagePropsType>> => {
  let id;
  if (params != null && "id" in params) {
    id = params.id;
  }
  if (id == null) {
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }

  // if user not found return notfound

  return {
    props: {
      posts,
      isLogin: true,
      user: {
        name: "siavash",
        description: "hello there im here to help people",
        profileUrl: fakePost.profile.profileUrl,
      },
      profileData: fakePost.profile,
    },
  };
};

export default UserPage;
