import React from "react";
import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import { LOOPRING_SUBGRAPH } from "../utils/config";

const FETCH_TRANSACTION = gql`
  query transactions(
    $transferWhere: Transfer_filter
    $withdrawalWhere: Withdrawal_filter
    $addWhere: Add_filter
    $removeWhere: Remove_filter
    $orderBookTradeWhere: OrderbookTrade_filter
    $mintNFTWhere: MintNFT_filter
    $withdrawNFTWhere: WithdrawalNFT_filter
    $transferNFTWhere: TransferNFT_filter
  ) {
    transfers(where: $transferWhere) {
      id
    }
    withdrawals(where: $withdrawalWhere) {
      id
    }
    adds(where: $addWhere) {
      id
    }
    removes(where: $removeWhere) {
      id
    }
    orderbookTrades(where: $orderBookTradeWhere) {
      id
    }
    mintNFTs(where: $mintNFTWhere) {
      id
    }
    withdrawalNFTs(where: $withdrawNFTWhere) {
      id
    }
    transferNFTs(where: $transferNFTWhere) {
      id
    }
  }
`;

const useCheckTxConfirmation = (accountID, tokenID, storageID) => {
  const { data, error } = useSWR(
    accountID ? [FETCH_TRANSACTION, accountID, tokenID, storageID] : null,
    (query) =>
      request(LOOPRING_SUBGRAPH, query, {
        transferWhere: {
          accountFromID: parseInt(accountID),
          storageID: parseInt(storageID),
          tokenID: parseInt(tokenID),
        },
        withdrawalWhere: {
          fromAccountID: parseInt(accountID),
          storageID: parseInt(storageID),
          tokenID: parseInt(tokenID),
        },
        addWhere: {
          accountFromID: parseInt(accountID),
          storageID: parseInt(storageID),
          tokenID: parseInt(tokenID),
        },
        removeWhere: {
          accountFromID: parseInt(accountID),
          storageID: parseInt(storageID),
          tokenID: parseInt(tokenID),
        },
        orderBookTradeWhere: {
          accountIdA: parseInt(accountID),
          storageIdA: parseInt(storageID),
          tokenIDAS: parseInt(tokenID),
        },
        mintNFTWhere: {
          minterAccountID: parseInt(accountID),
          storageID: parseInt(storageID),
          toTokenID: parseInt(tokenID),
        },
        withdrawNFTWhere: {
          fromAccountID: parseInt(accountID),
          storageID: parseInt(storageID),
          tokenID: parseInt(tokenID),
        },
        transferNFTWhere: {
          accountFromID: parseInt(accountID),
          storageID: parseInt(storageID),
          tokenID: parseInt(tokenID),
        },
      }),
    {
      refreshInterval: 60000,
    }
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useCheckTxConfirmation;
