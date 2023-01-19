import { useEffect, useState } from "react";

interface FetcherState {
  state: "error" | "success" | "pending" | "loader";
  data: any;
  run: boolean;
}

const useFetch = (fetcher: any) => {
  const [state, setState] = useState<FetcherState>({
    state: "pending",
    data: null,
    run: false,
  });

  const trigger = () => {
    setState((s) => ({ ...s, run: true, data: null, state: "loader" }));
  };
  useEffect(() => {
    try {
      if (state.run) {
        fetcher()
          .then((res: any) => {
            setState((s) => ({
              ...s,
              state: "success",
              run: false,
              data: res,
            }));
          })
          .catch(() => {
            setState((s) => ({ ...s, state: "error" }));
          });
      }
    } catch (err) {
      setState((s) => ({ ...s, state: "error" }));
    }
  }, [fetcher, state.run]);
  return [
    state.data != null ? state.data : null,
    state.state == "success",
    state.state == "loader",
    state.state == "error",
    state.state == "pending",
    trigger,
  ];
};

export default useFetch;
