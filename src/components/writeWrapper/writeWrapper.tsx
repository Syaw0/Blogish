import {
  writeStateEditBody,
  writeStateEditHead,
  writeStateEditSubHead,
} from "../../store/write/writeStore";
import { useWriteSelector } from "../../store/write/writeStoreHooks";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import WriteComponent from "../write/write";

const WriteWrapper = () => {
  const dispatch = useDispatch();
  const { postDetail, postHead, postSubhead } = useWriteSelector((s) => s);

  const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    if (name == "bodyInput") {
      dispatch(writeStateEditBody(value));
    } else if (name == "subHeadInput") {
      dispatch(writeStateEditSubHead(value));
    } else if (name == "headInput") {
      dispatch(writeStateEditHead(value));
    }
  };
  return (
    <>
      <WriteComponent
        bodyValue={postDetail}
        headValue={postHead}
        subHeadValue={postSubhead}
        onChange={changeHandle}
      />
    </>
  );
};

export default WriteWrapper;
