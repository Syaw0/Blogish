import { useEffect } from "react";

const useHighlightCode = () => {
  var hljs: any = {};
  useEffect(() => {
    if (hljs != null && hljs.highlightAll != null) {
      hljs.highlightAll();
    }
  });
};

export default useHighlightCode;
