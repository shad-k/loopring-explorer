import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import { LOOPRING_SUBGRAPH } from "../utils/config";
import { block } from "../graphql/fragments";

const FETCH_BLOCK = gql`
  query block($id: ID!) {
    proxy(id: 0) {
      blockCount
    }
    block(id: $id) {
      ...BlockFragment
      data
      transactionCount
      depositCount
      withdrawalCount
      transferCount
      addCount
      removeCount
      orderbookTradeCount
      swapCount
      accountUpdateCount
      ammUpdateCount
      signatureVerificationCount
      tradeNFTCount
      swapNFTCount
      withdrawalNFTCount
      transferNFTCount
    }
  }
  ${block}
`;

const useBlock = (id) => {
  const { data, error } = useSWR([FETCH_BLOCK, id], (query, id) =>
    request(LOOPRING_SUBGRAPH, query, {
      id,
    })
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useBlock;
