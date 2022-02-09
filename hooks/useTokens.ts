import useSWR from "swr";

import { LOOPRING_API } from "../utils/config";

const useTokens = () => {
  const { data, error } = useSWR(`${LOOPRING_API}exchange/tokens`, (endpoint) =>
    fetch(endpoint).then((res) => res.json())
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useTokens;
