import React from "react";

import PendingTransactionFromAPI from "./pending/PendingTransactionFromAPI";
import PendingTransactionBaseScreen from "./pending/PendingTransactionBaseScreen";
import PendingTransactionWithFallbackToAPI from "./pending/PendingTransactionWithFallbackToAPI";

const dataKey = {
  trade: "trades",
  joinAmm: "transactions",
  exitAmm: "transactions",
  transfer: "transactions",
  withdraw: "transactions",
  deposit: "transactions",
  nftMint: "mints",
  nftWithdraw: "withdrawals",
  nftTransfer: "transfers",
};

const PendingTx: React.FC<{ txId: string }> = ({ txId }) => {
  const txIdSplit = txId.split("-");

  switch (txIdSplit.length) {
    case 2:
      return <PendingTransactionFromAPI txId={txId} />;
    case 3:
      return <PendingTransactionBaseScreen txId={txId} />;
    case 5:
      return <PendingTransactionWithFallbackToAPI txId={txId} />;
    default:
      return null;
  }
};

export default PendingTx;
