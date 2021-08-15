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
    proxy(id: 0) {
      transactionCount
    }
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

      ... on Swap {
        id
        __typename
      }
      ... on OrderbookTrade {
        id
        __typename
      }
      ... on Add {
        id
        __typename
      }
      ... on Remove {
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
  orderBy = "internalID",
  orderDirection = "desc",
  block = null,
  typename = null
) => {
  const memoVariables = useMemo(() => {
    const variables = {
      skip,
      first,
      orderBy,
      orderDirection,
      where: {},
    };

    if (block) {
      variables.where = {
        ...variables.where,
        block,
      };
    }
    if (typename) {
      variables.where = {
        ...variables.where,
        typename,
      };
    }
    return variables;
  }, [skip, first, orderBy, orderDirection, block, typename]);

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
