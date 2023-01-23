import Layout from "../../components/layouts/multiSectionLayout/layout";
import Head from "next/head";
import Button from "../../components/button/button";
import Write from "../../components/write/write";

const fakeData = [
  { sectionName: "Write", component: <div>seciont1</div> },
  { sectionName: "Preview", component: <div>section2 Component</div> },
];

const WritePage = () => {
  return (
    <>
      <Head>
        <title>Write a Article</title>
        <meta name="description" content="blogish Write Page" />
      </Head>

      <Layout
        topNavExtraComponent={<Button>Hello</Button>}
        layoutData={fakeData}
      />
    </>
  );
};

export default WritePage;
