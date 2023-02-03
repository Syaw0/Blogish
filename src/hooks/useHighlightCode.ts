import { useEffect } from "react";

const useHighlightCode = () => {
  const highlight = async () => {
    const hljs = await import("highlight.js");
    hljs.default.highlightAll();
  };

  useEffect(() => {
    highlight();
  }, []);
};

export default useHighlightCode;
