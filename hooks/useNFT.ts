import React from "react";
import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";
import { ethers } from "ethers";

import { LOOPRING_SUBGRAPH } from "../utils/config";
import { account, nft, token } from "../graphql/fragments";

const FETCH_NFT = gql`
  query nonFungibleToken($id: ID!) {
    nonFungibleToken(id: $id) {
      ...NFTFragment
      __typename
    }
  }

  ${account}
  ${nft}
`;

const useNFT = (id) => {
  // const variables = React.useMemo(
  //   () => ({
  //     where: {
  //       id_in: [id],
  //       token_in: [tokenAddress],
  //     },
  //   }),
  //   [tokenAddress, id]
  // );
  const { data, error } = useSWR(id ? [FETCH_NFT, id] : null, (query, id) =>
    request(LOOPRING_SUBGRAPH, query, { id })
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useNFT;
