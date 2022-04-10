import useSWR from "swr";
import { apiEndpointByTxType, LOOPRING_API } from "../utils/config";

const getQueryParamName = (txType) => {
  switch (txType) {
    case "trade":
      return "orderHash";
    case "nftTrade":
      return "tradeHash";
    default:
      return "hashes";
  }
};

const usePendingTransactionData = (txType, txHash) => {
  const endpoint = `${LOOPRING_API}${
    apiEndpointByTxType[txType]
  }?${getQueryParamName(txType)}=${txHash}&accountId=0`;
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
