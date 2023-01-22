import Post from "../../../components/pageComponents/post/post";
import { fakePost, fakeUser } from "../../../shared/fakePost";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";

const PostPage = ({ ...params }: PostPagePropsType) => {
  const { postHead } = params.post;
  return (
    <>
      <Head>
        <title>{postHead}</title>
        <meta name="description" content={`blogish Post ${postHead}`} />
      </Head>
      <Post {...params} />
    </>
  );
};

let posts: PostType[] = [];
for (let i = 0; i != 5; i++) {
  posts.push({ ...fakePost });
}

posts.map((p: any, i) => {
  p.id = `post-${i + 1}`;
  return p;
});

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<PostPagePropsType>
> => {
  return {
    props: {
      profileData: fakePost.author,
      isLogin: true,
      post: fakePost,
      similar: posts,
    },
  };
};

export default PostPage;
