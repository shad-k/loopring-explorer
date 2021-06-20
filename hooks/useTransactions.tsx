import { useMemo } from "react";
import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import { LOOPRING_SUBGRAPH } from "../utils/config";

const FETCH_TXS = gql`
  query transactions(
    $skip: Int
    $first: Int
    $orderBy: Transaction_orderBy
    $orderDirection: OrderDirection
    $block: Block_height
    $where: Transaction_filter
  ) {
    transactions(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      block: $block
      where: $where
    ) {
      block {
        id
        timestamp
      }

      ... on SpotTrade {
        id
        __typename
      }
      ... on Deposit {
        id
        __typename
      }
      ... on Withdrawal {
        id
        __typename
      }
      ... on Transfer {
        id
        __typename
      }
      ... on AccountUpdate {
        id
        __typename
      }
      ... on AmmUpdate {
        id
        __typename
      }
      ... on SignatureVerification {
        id
        __typename
      }
    }
  }
`;

const useTransactions = (
  skip = 0,
  first = 10,
  orderBy = "id",
  orderDirection = "desc",
  block = null
) => {
  const memoVariables = useMemo(() => {
    if (block) {
      return {
        where: {
          block,
        },
      };
    }
    return {
      skip,
      first,
      orderBy,
      orderDirection,
    };
  }, [skip, first, orderBy, orderDirection, block]);
  const { data, error } = useSWR(
    [FETCH_TXS, memoVariables],
    (query, variables) => request(LOOPRING_SUBGRAPH, query, variables)
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useTransactions;
