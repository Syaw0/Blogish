import { TypedUseSelectorHook, useSelector } from "react-redux";
import { SettingState } from "./setting";

export const useSettingSelector: TypedUseSelectorHook<SettingState> =
  useSelector;
