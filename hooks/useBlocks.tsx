import { useMemo } from "react";
import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

const FETCH_BLOCKS = gql`
  query blocks(
    $skip: Int
    $first: Int
    $orderBy: Block_orderBy
    $orderDirection: OrderDirection
  ) {
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

type RequestVariables = {
  skip?: number;
  first?: number;
  orderBy?: string;
  orderDirection?: string;
};

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
    (query, variables) =>
      request(
        "https://api.thegraph.com/subgraphs/name/protofire/loopring-exchange-v2",
        query,
        variables
      )
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useBlocks;
