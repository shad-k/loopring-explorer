import useSWR from "swr";
import { apiEndpointByTxType, LOOPRING_API } from "../utils/config";

const usePendingTransactionData = (txType, txHash) => {
  const endpoint = `${LOOPRING_API}${apiEndpointByTxType[txType]}?${
    txType === "trade" ? "orderHash" : "hashes"
  }=${txHash}&accountId=0`;
  const { data, error } = useSWR(endpoint, (endpoint) =>
    fetch(endpoint).then((res) => res.json())
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default usePendingTransactionData;
