import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import { LOOPRING_SUBGRAPH } from "../utils/config";

const FETCH_TXS = gql`
  query transactions {
    transactions(first: 10, orderBy: id, orderDirection: desc) {
      id
      block {
        id
        timestamp
      }
    }
  }
`;

const useTransactions = () => {
  const { data, error } = useSWR(FETCH_TXS, (query, variables) =>
    request(LOOPRING_SUBGRAPH, query, variables)
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useTransactions;
