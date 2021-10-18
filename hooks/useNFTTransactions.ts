import { useMemo } from "react";
import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import { LOOPRING_SUBGRAPH } from "../utils/config";
import {
  account,
  accountUpdate,
  add,
  ammUpdate,
  deposit,
  orderbookTrade,
  pool,
  remove,
  signatureVerification,
  swap,
  token,
  transfer,
  withdrawal,
  tradeNFT,
  swapNFT,
  withdrawalNFT,
  transferNFT,
  mintNFT,
  dataNFT,
} from "../graphql/fragments";

export const FETCH_NFT_TXS = gql`
  query transactionsNFTs(
    $skip: Int
    $first: Int
    $orderBy: Transaction_orderBy
    $orderDirection: OrderDirection
    $where: Transaction_filter
  ) {
    transactionsNFTs(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      internalID
      block {
        id
        blockHash
        timestamp
      }
      data

      ...TradeNFTFragment
      ...SwapNFTFragment
      ...WithdrawalNFTFragment
      ...TransferNFTFragment
      ...MintNFTFragment
      ...DataNFTFragment
    }
  }

  ${account}
  ${token}
  ${pool}

  ${add}
  ${remove}
  ${swap}
  ${orderbookTrade}
  ${deposit}
  ${withdrawal}
  ${transfer}
  ${accountUpdate}
  ${ammUpdate}
  ${signatureVerification}
  ${tradeNFT}
  ${swapNFT}
  ${withdrawalNFT}
  ${transferNFT}
  ${mintNFT}
  ${dataNFT}
`;

const useNFTTransactions = (
  skip = 0,
  first = 10,
  orderBy = "internalID",
  orderDirection = "desc",
  typename = null,
  nfts = []
) => {
  const memoVariables = useMemo(() => {
    const variables = {
      skip,
      first,
      orderBy,
      orderDirection,
      where: {},
    };

    if (nfts.length > 0) {
      variables.where = {
        ...variables.where,
        nfts_contains: nfts,
      };
    }
    if (typename) {
      variables.where = {
        ...variables.where,
        typename,
      };
    }
    return variables;
  }, [skip, first, orderBy, orderDirection, typename]);

  const { data, error } = useSWR(
    [FETCH_NFT_TXS, memoVariables],
    (query, variables) => request(LOOPRING_SUBGRAPH, query, variables)
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useNFTTransactions;
