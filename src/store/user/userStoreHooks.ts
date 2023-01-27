import { TypedUseSelectorHook, useSelector } from "react-redux";
import { UserState } from "./userStore";

export const useUserSelector: TypedUseSelectorHook<UserState> = useSelector;
