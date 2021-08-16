import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import { LOOPRING_SUBGRAPH } from "../utils/config";
import { account, token } from "../graphql/fragments";

const FETCH_ACCOUNTS = gql`
  query accounts(
    $skip: Int
    $first: Int
    $orderBy: Transaction_orderBy
    $orderDirection: OrderDirection
    $block: Block_height
    $where: Account_filter
  ) {
    accounts(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      block: $block
      where: $where
    ) {
      id
      ...AccountFragment
      balances {
        id
        balance
        token {
          ...TokenFragment
        }
      }
      createdAtTransaction {
        id
        block {
          timestamp
        }
      }

      ... on Pool {
        feeBipsAMM
      }

      __typename
    }
  }

  ${account}
  ${token}
`;

const useAccounts = (id) => {
  let variables: any = {
    skip: 0,
    first: 1,
    where: {
      id,
    },
  };
  if (id && id.startsWith("0x")) {
    variables = {
      where: {
        address: id,
      },
    };
  }
  const { data, error } = useSWR([FETCH_ACCOUNTS, id], (query, id) =>
    request(LOOPRING_SUBGRAPH, query, variables)
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useAccounts;
