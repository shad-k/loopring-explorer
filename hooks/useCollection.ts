import React from "react";
import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import { LOOPRING_SUBGRAPH } from "../utils/config";
import { account, nft } from "../graphql/fragments";

const FETCH_COLLECTION = gql`
  query nonFungibleTokens(
    $where: NonFungibleToken_filter
    $first: Int
    $skip: Int
  ) {
    nonFungibleTokens(where: $where, first: $first, skip: $skip) {
      ...NFTFragment
      __typename
    }
  }

  ${account}
  ${nft}
`;

const useCollection = (address, first, skip) => {
  const variables = React.useMemo(() => {
    return {
      where: {
        token_in: [address],
      },
      first,
      skip,
    };
  }, [address, first, skip]);
  const { data, error } = useSWR(
    address ? [FETCH_COLLECTION, variables] : null,
    (query, id) => request(LOOPRING_SUBGRAPH, query, variables)
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useCollection;
