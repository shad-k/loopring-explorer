import React from "react";
import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";
import { ethers } from "ethers";

import { LOOPRING_SUBGRAPH } from "../utils/config";
import { account, nft, token } from "../graphql/fragments";

const FETCH_NFT_SLOT = gql`
  query accountNFTSlot($id: ID!) {
    accountNFTSlot(id: $id) {
      id
      account {
        ...AccountFragment
      }
      balance
      nft {
        ...NFTFragment
      }
      __typename
    }
  }

  ${account}
  ${nft}
`;

const useNFTSlot = (id) => {
  const { data, error } = useSWR(id ? [FETCH_NFT_SLOT, id] : null, (query) =>
    request(LOOPRING_SUBGRAPH, query, { id })
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useNFTSlot;
