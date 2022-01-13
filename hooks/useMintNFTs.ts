import React from "react";
import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import { LOOPRING_SUBGRAPH } from "../utils/config";

const FETCH_MINT_NFTS = gql`
  query mintNFTs($where: MintNFT_filter) {
    mintNFTs(where: $transactionFilter) {
      id
    }
  }
`;

const useMintNFTs = (address) => {
  const variables = React.useMemo(() => {
    return {
      where: {
        tokenAddress_in: [address],
      },
    };
  }, [address]);
  const { data, error } = useSWR(
    address ? [FETCH_MINT_NFTS, address] : null,
    (query) => request(LOOPRING_SUBGRAPH, query, variables)
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useMintNFTs;
