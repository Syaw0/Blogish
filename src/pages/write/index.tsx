import Layout from "../../components/layouts/multiSectionLayout/layout";
import Head from "next/head";
import Button from "@/components/button/button";

const fakeData = [
  { sectionName: "Write", component: <div>section1 Component</div> },
  { sectionName: "Preview", component: <div>section2 Component</div> },
  { sectionName: "section3", component: <div>section3 Component</div> },
  { sectionName: "section4", component: <div>section4 Component</div> },
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
