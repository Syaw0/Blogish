import Post from "../../../components/pageComponents/post/post";
import { fakePost } from "../../../shared/fakePost";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import showdown from "showdown";
import { Provider } from "react-redux";
import makeStore from "../../../store/user/userStore";
import getPost from "../../../../db/util/getPost";
import getUser from "../../../../db/util/getUser";
import getSimilarPosts from "../../../../db/util/getSimilarPost";
import getPostContent from "../../../../db/util/getPostContent";

const PostPage = ({ ...params }: PostPagePropsType) => {
  const { postHead } = params.post;
  return (
    <>
      <Head>
        <title>{postHead}</title>
        <meta name="description" content={`blogish Post ${postHead}`} />
      </Head>
      <Provider store={makeStore(params)}>
        <Post {...params} />
      </Provider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}): Promise<GetServerSidePropsResult<any>> => {
  const post = await getPost(params && params.id);
  if (!post.status) {
    return { redirect: { destination: "/404", permanent: false } };
  }
  const authorId = post.data.author;
  const user = await getUser(authorId);
  const similarPost = await getSimilarPosts(authorId, post.data.id);
  const postContent = await getPostContent(params && params.id);
  if (!postContent.status) {
    return { redirect: { destination: "/404", permanent: false } };
  }

  const convertor = new showdown.Converter();

  post.data.author = user.data;
  post.data.postDetail = convertor.makeHtml(
    postContent.data != null ? postContent.data : ""
  );
  console.log(post);
  return {
    props: {
      profileData: fakePost.author,
      isLogin: true,
      post: post.data,
      similar: similarPost.data,
    },
  };
};

export default PostPage;
