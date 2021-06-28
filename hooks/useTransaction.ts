import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import { LOOPRING_SUBGRAPH } from "../utils/config";
import { spotTrade, deposit } from "../graphql/fragments";

const FETCH_TRANSACTION = gql`
  query transaction($id: ID!) {
    transaction(id: $id) {
      block {
        id
        blockHash
        timestamp
      }
      data

      ...SpotTradeFragment
      ...DepositFragment

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
  ${spotTrade}
  ${deposit}
`;

const useTransaction = (id) => {
  const { data, error } = useSWR([FETCH_TRANSACTION, id], (query, id) =>
    id
      ? request(LOOPRING_SUBGRAPH, query, {
          id,
        })
      : null
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useTransaction;
