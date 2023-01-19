import { useEffect, useState } from "react";

type States = "error" | "success" | "pending" | "loader";
interface FetcherState {
  state: States;
  data: any;
  run: boolean;
  msg: string;
}

interface FetcherObject {
  fetcher: () => Promise<any>;
  loaderMsg: string;
}

type UseFetchReturnType = [any, () => void, States, string];

const useFetch = (fetcherObject: FetcherObject): UseFetchReturnType => {
  const [state, setState] = useState<FetcherState>({
    state: "pending",
    data: null,
    run: false,
    msg: "",
  });

  const trigger = () => {
    setState((s) => ({
      ...s,
      run: true,
      data: null,
      state: "loader",
      msg: fetcherObject.loaderMsg,
    }));
  };
  useEffect(() => {
    try {
      if (state.run) {
        fetcherObject
          .fetcher()
          .then((res: any) => {
            setTimeout(() => {
              setState((s) => ({
                ...s,
                state: "success",
                run: false,
                data: res,
                msg: "successfully set Data",
              }));
            }, 2000);
          })
          .catch(() => {
            setState((s) => ({
              ...s,
              state: "error",
              run: false,
              msg: "error from server",
            }));
          });
      }
    } catch (err) {
      setState((s) => ({
        ...s,
        state: "error",
        run: false,
        msg: "error from client",
      }));
    }
  }, [fetcherObject, state.run]);
  return [
    state.data != null ? state.data : null,
    trigger,
    state.state,
    state.msg,
  ];
};

export default useFetch;
