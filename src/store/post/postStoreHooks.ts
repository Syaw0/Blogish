import { TypedUseSelectorHook, useSelector } from "react-redux";
import { PostState } from "./postStore";

export const useUserSelector: TypedUseSelectorHook<PostState> = useSelector;
