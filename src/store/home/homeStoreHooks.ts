import { TypedUseSelectorHook, useSelector } from "react-redux";
import { HomeState } from "./homeStore";

export const useHomeSelector: TypedUseSelectorHook<HomeState> = useSelector;
