import Search from "../../components/pageComponents/search/search";
import { fakePost } from "../../shared/fakePost";
import makeStore from "../../store/search/searchStore";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import { ParsedUrlQuery } from "querystring";

interface SearchPagePropsType extends MainPagePropsType {
  query: ParsedUrlQuery;
}

const SearchPage = ({ ...props }: SearchPagePropsType) => {
  const query = props.query.query;
  return (
    <>
      <Head>
        <title>Search</title>
        <meta name="description" content="blogish Search Page" />
      </Head>

      <Provider
        store={makeStore(
          props.posts != null ? props.posts : [],
          query != null ? query : ""
        )}
      >
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
  return {
    props: {
      isLogin: false,
      posts,
      profileData: fakePost.author,
      query,
    },
  };
};

export default SearchPage;
