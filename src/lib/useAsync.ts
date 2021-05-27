import { DependencyList, useEffect, useState } from "react";
import { AsyncResult } from "typed-utilities";

export const useAsync = <T>(
  fn: () => Promise<T>,
  deps: DependencyList,
): AsyncResult.AsyncResult<T> => {
  const [state, setState] = useState<AsyncResult.AsyncResult<T>>(
    AsyncResult.of.pending(),
  );

  useEffect(() => {
    setState(AsyncResult.of.pending());
    let shouldUpdate = true;
    fn()
      .then((value) => {
        if (shouldUpdate) {
          setState(AsyncResult.of.resolved(value));
        }
      })
      .catch((error) => {
        if (shouldUpdate) {
          setState(AsyncResult.of.rejected(error));
        }
      });
    return () => {
      shouldUpdate = false;
    };
  }, deps);

  return state;
};
