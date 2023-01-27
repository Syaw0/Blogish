import { TypedUseSelectorHook, useSelector } from "react-redux";
import { SearchState } from "./searchStore";

export const useSearchSelector: TypedUseSelectorHook<SearchState> = useSelector;
