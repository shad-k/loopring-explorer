import React from 'react';
import { usePendingTransactionsQuery } from '../generated/loopringExplorer';

const useCheckTxConfirmation = (accountID, tokenID, storageID) => {
  const { data, error, loading } = usePendingTransactionsQuery({
    skip: !accountID,
    variables: {
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
      swapWhere: {
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
      tradeNFTWhere: {
        accountIdA: parseInt(accountID),
        storageIdA: parseInt(storageID),
        tokenIDAS: parseInt(tokenID),
      },
      accountUpdateWhere: {
        accountID: parseInt(accountID),
        nonce: parseInt(storageID),
      },
    },
    pollInterval: 60000,
  });

  return {
    data,
    error,
    isLoading: loading,
  };
};

export default useCheckTxConfirmation;
