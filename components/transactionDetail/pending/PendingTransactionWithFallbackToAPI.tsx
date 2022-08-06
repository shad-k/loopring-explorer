import React from 'react';
import { useRouter } from 'next/router';

import useCheckTxConfirmation from '../../../hooks/useCheckTxConfirmation';
import PendingTransactionFromAPI from './PendingTransactionFromAPI';

const PendingTransactionWithFallbackToAPI: React.FC<{ txId: string }> = ({ txId }) => {
  const router = useRouter();
  const txIdSplit = txId.split('-');

  const { data: confirmedTx, isLoading } = useCheckTxConfirmation(txIdSplit[2], txIdSplit[3], txIdSplit[4]);
  if (!isLoading && !confirmedTx) {
    return <PendingTransactionFromAPI txId={txId} />;
  }

  const isConfirmed =
    confirmedTx &&
    (confirmedTx.transfers.length > 0 ||
      confirmedTx.withdrawals.length > 0 ||
      confirmedTx.adds.length > 0 ||
      confirmedTx.removes.length > 0 ||
      confirmedTx.orderbookTrades.length > 0 ||
      confirmedTx.swaps.length > 0 ||
      confirmedTx.mintNFTs.length > 0 ||
      confirmedTx.tradeNFTs.length > 0 ||
      confirmedTx.tradeNFTsB.length > 0 ||
      confirmedTx.withdrawalNFTs.length > 0 ||
      confirmedTx.accountUpdates.length > 0 ||
      confirmedTx.transferNFTs.length > 0);

  if (isConfirmed) {
    if (confirmedTx.withdrawals.length > 0) router.replace(`/tx/${confirmedTx.withdrawals[0].id}`);
    if (confirmedTx.transfers.length > 0) router.replace(`/tx/${confirmedTx.transfers[0].id}`);
    if (confirmedTx.adds.length > 0) router.replace(`/tx/${confirmedTx.adds[0].id}`);
    if (confirmedTx.removes.length > 0) router.replace(`/tx/${confirmedTx.removes[0].id}`);
    if (confirmedTx.orderbookTrades.length > 0) router.replace(`/tx/${confirmedTx.orderbookTrades[0].id}`);
    if (confirmedTx.swaps.length > 0) router.replace(`/tx/${confirmedTx.swaps[0].id}`);
    if (confirmedTx.mintNFTs.length > 0) router.replace(`/tx/${confirmedTx.mintNFTs[0].id}`);
    if (confirmedTx.transferNFTs.length > 0) router.replace(`/tx/${confirmedTx.transferNFTs[0].id}`);
    if (confirmedTx.tradeNFTs.length > 0) router.replace(`/tx/${confirmedTx.tradeNFTs[0].id}`);
    if (confirmedTx.tradeNFTsB.length > 0) router.replace(`/tx/${confirmedTx.tradeNFTsB[0].id}`);
    if (confirmedTx.withdrawalNFTs.length > 0) router.replace(`/tx/${confirmedTx.withdrawalNFTs[0].id}`);
    if (confirmedTx.accountUpdates.length > 0) router.replace(`/tx/${confirmedTx.accountUpdates[0].id}`);
  }

  return null;
};

export default PendingTransactionWithFallbackToAPI;
