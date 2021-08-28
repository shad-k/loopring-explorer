import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import { LOOPRING_SUBGRAPH } from "../utils/config";
import {
  swap,
  orderbookTrade,
  token,
  account,
  pool,
} from "../graphql/fragments";
import React from "react";

const FETCH_PAIR = gql`
  query pair(
    $id: ID!
    $swapSkip: Int
    $swapFirst: Int
    $orderbookSkip: Int
    $orderbookFirst: Int
  ) {
    pair(id: $id) {
      id
      internalID
      token0 {
        ...TokenFragment
      }
      token1 {
        ...TokenFragment
      }
      token0Price
      token1Price

      tradedVolumeToken0Swap
      tradedVolumeToken1Swap
      tradedVolumeToken0Orderbook
      tradedVolumeToken1Orderbook

      swaps(
        skip: $swapSkip
        first: $swapFirst
        orderDirection: desc
        orderBy: internalID
      ) {
        block {
          id
          blockHash
          timestamp
        }
        ...SwapFragment
      }

      trades(
        skip: $orderbookSkip
        first: $orderbookFirst
        orderDirection: desc
        orderBy: internalID
      ) {
        block {
          id
          blockHash
          timestamp
        }
        ...OrderbookTradeFragment
      }
      __typename
    }
  }

  ${swap}
  ${orderbookTrade}
  ${token}
  ${account}
  ${pool}
`;

const useAccount = (
  id,
  swapPage = 1,
  swapPerPage = 10,
  orderbookPage = 1,
  orderbookPerPage = 10
) => {
  const swapSkip = (swapPage - 1) * swapPerPage;
  const orderbookSkip = (orderbookPage - 1) * orderbookPerPage;

  const [pairData, setPairData] = React.useState();

  const { data, error } = useSWR(
    [FETCH_PAIR, id, swapSkip, swapPerPage, orderbookSkip, orderbookPerPage],
    (query, id, swapSkip, swapPerPage, orderbookSkip, orderbookPerPage) =>
      request(LOOPRING_SUBGRAPH, query, {
        id,
        swapSkip,
        swapFirst: swapPerPage,
        orderbookSkip,
        orderbookFirst: orderbookPerPage,
      })
  );

  React.useEffect(() => {
    if (data) {
      setPairData(data);
    }
  }, [data]);

  return {
    data: pairData,
    error,
    isLoading: !pairData && !error,
  };
};

export default useAccount;
