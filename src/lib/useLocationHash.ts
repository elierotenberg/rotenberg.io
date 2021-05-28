import { useEffect, useState } from "react";

export const useLocationHash = (): null | string => {
  const [hash, setHash] = useState<null | string>(null);

  useEffect(() => {
    const onChangeHash = (): void => {
      if (typeof window !== `undefined`) {
        setHash(window.location.hash.slice(1));
      }
    };
    window.addEventListener(`hashchange`, onChangeHash);
    onChangeHash();
    return () => {
      window.removeEventListener(`hashchange`, onChangeHash);
    };
  }, []);

  return hash;
};
