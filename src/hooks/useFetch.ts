import { useEffect, useState } from "react";

// ? Should i test this hook?

interface FetcherState {
  state: FetchStateTypes;
  data: any;
  run: boolean;
  msg: string;
  params: any;
  setMsg(type: FetchStateTypes, msg: string): void;
}

interface FetcherObject {
  fetcher: (...params: any) => Promise<FetchResponse>;
  loaderMsg: string;
}

type UseFetchReturnType = [
  any,
  (...args: any) => void,
  FetchStateTypes,
  string,
  (type: FetchStateTypes, msg: string) => void
];

const useFetch = (fetcherObject: FetcherObject): UseFetchReturnType => {
  const [state, setState] = useState<FetcherState>({
    state: "pending",
    data: null,
    run: false,
    msg: "",
    params: {},
    setMsg(type, msg) {
      setState((s) => ({ ...s, msg: msg, state: type }));
    },
  });

  const trigger = (...args: any) => {
    setState((s) => ({
      ...s,
      run: true,
      data: null,
      state: "loader",
      msg: fetcherObject.loaderMsg,
      params: args,
    }));
  };
  useEffect(() => {
    try {
      if (state.run) {
        fetcherObject
          .fetcher(...state.params)
          .then((res) => {
            if (res.status) {
              setTimeout(() => {
                setState((s) => ({
                  ...s,
                  state: "success",
                  run: false,
                  data: res.data,
                  msg: res.msg,
                }));
              }, 2000);
              return;
            }
            setState((s) => ({
              ...s,
              state: "error",
              run: false,
              msg: res.msg,
            }));
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
  }, [fetcherObject, state.run, state.params]);
  return [
    state.data != null ? state.data : null,
    trigger,
    state.state,
    state.msg,
    state.setMsg,
  ];
};

export default useFetch;
