import Layout from "../../../components/layouts/multiSectionLayout/layout";
import style from "./write.module.css";
import WriteWrapper from "../../../components/writeWrapper/writeWrapper";
import Navbar from "../../../components/navbar/navbar";
import Button from "../../../components/button/button";
import BlogMdWrapper from "../../../components/blogMdWrapper/blogMdWrapper";
import useCancelNavigate from "../../../hooks/useCancelNavigate";
import Message from "../../../components/message/message";
import useFetch from "../../../hooks/useFetch";
import publishPost, { loaderMsg } from "../../../utils/publishPost";
import { useWriteSelector } from "../../../store/write/writeStoreHooks";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Write = ({ isLogin, isEdit, profileData }: WritePagePropsType) => {
  const router = useRouter();
  let [data, trigger, state, msg, setMsg] = useFetch(publishPost, loaderMsg);
  const states = useWriteSelector((s) => s);
  const canceler = useCancelNavigate();

  useEffect(() => {
    if (data != null) {
      router.replace("/");
    } else {
      canceler(true);
    }
  }, [data, router, canceler]);

  const startPublishing = () => {
    if (checkInputs()) {
      setMsg("error", "Please fill all inputs.");
    } else {
      canceler(false);
      trigger(states);
    }

    setTimeout(() => {
      setMsg("pending", "");
    }, 2000);
  };
  const checkInputs = () => {
    return (
      states.postDetail === "" ||
      states.postHead === "" ||
      states.postSubhead === ""
    );
  };
  return (
    <div className={style.holder}>
      <Navbar profileData={profileData} isLogin={isLogin} />
      <Layout
        className={style.layout}
        topNavExtraComponent={
          <div className={style.topRightHolder}>
            <Button
              testid="publishButton"
              loader={state == "loader"}
              className={style.topRightButton}
              onClick={startPublishing}
            >
              {isEdit ? "Publish Changes" : "Publish"}
            </Button>
            <Message type={state} msg={msg} />
          </div>
        }
        layoutData={[
          {
            sectionName: "Write",
            component: <WriteWrapper />,
          },
          {
            sectionName: "Preview",
            component: <BlogMdWrapper />,
          },
        ]}
      />
    </div>
  );
};

export default Write;
