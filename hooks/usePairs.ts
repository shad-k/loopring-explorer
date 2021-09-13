import { useMemo } from "react";
import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import { LOOPRING_SUBGRAPH } from "../utils/config";
import { token } from "../graphql/fragments";

export const FETCH_PAIRS = gql`
  query pairs(
    $skip: Int
    $first: Int
    $orderBy: Transaction_orderBy
    $orderDirection: OrderDirection
  ) {
    pairs(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      internalID
      token0 {
        ...TokenFragment
      }
      token1 {
        ...TokenFragment
      }
    }
  }

  ${token}
`;

const usePairs = (
  skip = 0,
  first = 10,
  orderBy = "internalID",
  orderDirection = "asc"
) => {
  const memoVariables = useMemo(() => {
    const variables = {
      skip,
      first,
      orderBy,
      orderDirection,
    };

    return variables;
  }, [skip, first, orderBy, orderDirection]);

  const { data, error } = useSWR(
    [FETCH_PAIRS, memoVariables],
    (query, variables) => request(LOOPRING_SUBGRAPH, query, variables)
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default usePairs;
