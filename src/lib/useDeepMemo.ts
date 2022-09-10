import deepEqual from "fast-deep-equal";
import type { DependencyList } from "react";
import { useEffect, useState } from "react";

export const useDeepMemo = <T>(fn: () => T, deps: DependencyList): T => {
  const [state, setState] = useState<[DependencyList, T]>(() => [deps, fn()]);

  useEffect(() => {
    if (!deepEqual(deps, state[0])) {
      setState([deps, fn()]);
    }
  }, deps);

  return state[1];
};
