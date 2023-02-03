import { useWriteSelector } from "../../store/write/writeStoreHooks";
import BlogMD from "../blogMd/blogMd";
import Showdown from "showdown";
import useHighlightCode from "../../hooks/useHighlightCode";

const BlogMdWrapper = () => {
  useHighlightCode();

  const converter = new Showdown.Converter();
  const { postDetail, postHead, postSubhead } = useWriteSelector((s) => s);
  return (
    <>
      <BlogMD
        body={converter.makeHtml(postDetail)}
        description={postSubhead}
        header={postHead}
      />
    </>
  );
};
export default BlogMdWrapper;
