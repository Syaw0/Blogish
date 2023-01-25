import Search from "../../components/pageComponents/search/search";
import { fakePost } from "../../shared/fakePost";
import makeStore from "../../store/search/searchStore";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import search from "../../../db/util/search";

const SearchPage = ({ ...props }: SearchPagePropsType) => {
  return (
    <>
      <Head>
        <title>Search</title>
        <meta name="description" content="blogish Search Page" />
      </Head>

      <Provider store={makeStore(props)}>
        <Search {...props} />
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
  query,
}): Promise<GetServerSidePropsResult<SearchPagePropsType>> => {
  const searchQuery = `${query.query}`;
  const data = await search(searchQuery);
  if (!data.status) {
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }
  return {
    props: {
      isLogin: false,
      posts: data.data != null ? data.data.slice(0, data.data.length) : [],
      profileData: fakePost.author,
      query: query.query as string,
    },
  };
};

export default SearchPage;
