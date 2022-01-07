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
  }
`;

const useCheckTxConfirmation = (accountFromID, tokenID, storageID) => {
  const { data, error } = useSWR(
    [FETCH_TRANSACTION, accountFromID, storageID],
    (query, id) =>
      request(LOOPRING_SUBGRAPH, query, {
        transferWhere: {
          accountFromID: parseInt(accountFromID),
          storageID: parseInt(storageID),
          tokenID: parseInt(tokenID),
        },
        withdrawalWhere: {
          fromAccountID: parseInt(accountFromID),
          storageID: parseInt(storageID),
          tokenID: parseInt(tokenID),
        },
        addWhere: {
          accountFromID: parseInt(accountFromID),
          storageID: parseInt(storageID),
          tokenID: parseInt(tokenID),
        },
        removeWhere: {
          accountFromID: parseInt(accountFromID),
          storageID: parseInt(storageID),
          tokenID: parseInt(tokenID),
        },
        orderBookTradeWhere: {
          accountIdA: parseInt(accountFromID),
          storageIdA: parseInt(storageID),
          tokenIDAS: parseInt(tokenID),
        },
        mintNFTWhere: {
          minterAccountID: parseInt(accountFromID),
          storageID: parseInt(storageID),
          toTokenID: parseInt(tokenID),
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
