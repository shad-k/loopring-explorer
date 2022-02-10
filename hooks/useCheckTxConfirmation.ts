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

const useCheckTxConfirmation = (transactions = []) => {
  const txData = transactions[0];

  const { data, error } = useSWR(
    transactions.length > 0
      ? [
          FETCH_TRANSACTION,
          txData?.storageInfo?.accountId,
          txData?.storageInfo?.storageId,
        ]
      : null,
    (query) =>
      request(LOOPRING_SUBGRAPH, query, {
        transferWhere: {
          accountFromID: txData?.storageInfo?.accountId,
          storageID: txData?.storageInfo?.storageId,
          tokenID: txData?.storageInfo?.tokenId,
        },
        withdrawalWhere: {
          fromAccountID: txData?.storageInfo?.accountId,
          storageID: txData?.storageInfo?.storageId,
          tokenID: txData?.storageInfo?.tokenId,
        },
        addWhere: {
          accountFromID: txData?.storageInfo?.accountId,
          storageID: txData?.storageInfo?.storageId,
          tokenID: txData?.storageInfo?.tokenId,
        },
        removeWhere: {
          accountFromID: txData?.storageInfo?.accountId,
          storageID: txData?.storageInfo?.storageId,
          tokenID: txData?.storageInfo?.tokenId,
        },
        orderBookTradeWhere: {
          accountIdA: txData?.storageInfo?.accountId,
          storageIdA: txData?.storageInfo?.storageId,
          tokenIDAS: txData?.storageInfo?.tokenId,
        },
        mintNFTWhere: {
          minterAccountID: txData?.storageInfo?.accountId,
          storageID: txData?.storageInfo?.storageId,
          toTokenID: txData?.storageInfo?.tokenId,
        },
        withdrawNFTWhere: {
          fromAccountID: txData?.storageInfo?.accountId,
          storageID: txData?.storageInfo?.storageId,
          tokenID: txData?.storageInfo?.tokenId,
        },
        transferNFTWhere: {
          accountFromID: txData?.storageInfo?.accountId,
          storageID: txData?.storageInfo?.storageId,
          tokenID: txData?.storageInfo?.tokenId,
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
