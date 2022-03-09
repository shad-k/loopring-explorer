import React from "react";
import { useRouter } from "next/router";

import useCheckTxConfirmation from "../../../hooks/useCheckTxConfirmation";

const PendingTransactionBaseScreen: React.FC<{ txId: string }> = ({ txId }) => {
  const router = useRouter();
  const txIdSplit = txId.split("-");
  const { data: confirmedTx, isLoading } = useCheckTxConfirmation(
    txIdSplit[0],
    txIdSplit[1],
    txIdSplit[2]
  );

  const isConfirmed =
    confirmedTx &&
    (confirmedTx.transfers.length > 0 ||
      confirmedTx.withdrawals.length > 0 ||
      confirmedTx.adds.length > 0 ||
      confirmedTx.removes.length > 0 ||
      confirmedTx.orderbookTrades.length > 0 ||
      confirmedTx.mintNFTs.length > 0);

  if (isConfirmed) {
    if (confirmedTx.withdrawals.length > 0)
      router.replace(`/tx/${confirmedTx.withdrawals[0].id}`);
    if (confirmedTx.transfers.length > 0)
      router.replace(`/tx/${confirmedTx.transfers[0].id}`);
    if (confirmedTx.adds.length > 0)
      router.replace(`/tx/${confirmedTx.adds[0].id}`);
    if (confirmedTx.removes.length > 0)
      router.replace(`/tx/${confirmedTx.removes[0].id}`);
    if (confirmedTx.orderbookTrades.length > 0)
      router.replace(`/tx/${confirmedTx.orderbookTrades[0].id}`);
    if (confirmedTx.mintNFTs.length > 0)
      router.replace(`/tx/${confirmedTx.mintNFTs[0].id}`);
  }

  if (isLoading) {
    return null;
  }

  return (
    <div className="bg-white border border-dashed dark:bg-loopring-dark-background rounded p-4 m-5 flex items-center justify-center text-4xl italic">
      Transaction is pending...
    </div>
  );
};

export default PendingTransactionBaseScreen;
