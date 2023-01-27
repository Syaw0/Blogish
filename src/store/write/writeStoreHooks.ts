import { TypedUseSelectorHook, useSelector } from "react-redux";
import { WriteState } from "./writeStore";

export const useWriteSelector: TypedUseSelectorHook<WriteState> = useSelector;
