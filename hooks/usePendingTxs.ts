import useSWR from "swr";

import { LOOPRING_API } from "../utils/config";

const usePendingTxs = () => {
  const apiEndpoint = `${LOOPRING_API}block/getPendingRequests`;
  const { data, error } = useSWR(apiEndpoint, (endpoint) =>
    fetch(endpoint).then((res) => res.json())
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default usePendingTxs;
