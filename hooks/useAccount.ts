import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import { LOOPRING_SUBGRAPH } from "../utils/config";
import { account, token } from "../graphql/fragments";

const FETCH_ACCOUNT = gql`
  query account($id: ID!) {
    account(id: $id) {
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

const useAccount = (id) => {
  const { data, error } = useSWR([FETCH_ACCOUNT, id], (query, id) =>
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

export default useAccount;
