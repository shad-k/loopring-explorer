import { useMemo } from "react";
import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import { block } from "../graphql/fragments";
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
      userCount
    }
    blocks(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      ...BlockFragment
      transactionCount
    }
  }
  ${block}
`;

const useBlocks = (
  skip = 0,
  first = 10,
  orderBy = "internalID",
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
