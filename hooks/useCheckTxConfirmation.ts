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

const useCheckTxConfirmation = (accountFromID, storageID) => {
  const { data, error } = useSWR(
    [FETCH_TRANSACTION, accountFromID, storageID],
    (query, id) =>
      request(LOOPRING_SUBGRAPH, query, {
        transferWhere: {
          accountFromID: parseInt(accountFromID),
          storageID: parseInt(storageID),
        },
        withdrawalWhere: {
          fromAccountID: parseInt(accountFromID),
          storageID: parseInt(storageID),
        },
        addWhere: {
          accountFromID: parseInt(accountFromID),
          storageID: parseInt(storageID),
        },
        removeWhere: {
          accountFromID: parseInt(accountFromID),
          storageID: parseInt(storageID),
        },
        orderBookTradeWhere: {
          accountIdA: parseInt(accountFromID),
          storageIdA: parseInt(storageID),
        },
        mintNFTWhere: {
          minterAccountID: parseInt(accountFromID),
          storageID: parseInt(storageID),
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
