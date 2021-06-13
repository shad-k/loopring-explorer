import { useMemo } from "react";
import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import { LOOPRING_SUBGRAPH } from "../utils/config";

const FETCH_BLOCKS = gql`
  query blocks(
    $skip: Int
    $first: Int
    $orderBy: Block_orderBy
    $orderDirection: OrderDirection
  ) {
    proxy(id: 0) {
      blockCount
    }
    blocks(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      timestamp
      txHash
      gasUsed
      gasPrice
      height
      blockHash
      operatorAccountID
      operatorAccount {
        address
      }
      transactions {
        id
      }
    }
  }
`;

const useBlocks = (
  skip = 0,
  first = 10,
  orderBy = "id",
  orderDirection = "desc"
) => {
  const memoVariables = useMemo(() => {
    return {
      skip,
      first,
      orderBy,
      orderDirection,
    };
  }, [skip, first, orderBy, orderDirection]);

  const { data, error } = useSWR(
    [FETCH_BLOCKS, memoVariables],
    (query, variables) => request(LOOPRING_SUBGRAPH, query, variables)
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useBlocks;
