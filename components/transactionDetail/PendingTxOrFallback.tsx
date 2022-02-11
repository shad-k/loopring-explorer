import React from "react";
import { useRouter } from "next/router";

import useTokens from "../../hooks/useTokens";
import Add from "./Add";
import MintNFT from "./MintNFT";
import OrderbookTrade from "./OrderbookTrade";
import Remove from "./Remove";
import Transfer from "./Transfer";
import Withdrawal from "./Withdrawal";
import usePendingTransactionData from "../../hooks/usePendingTransactionData";
import Deposit from "./Deposit";
import WithdrawalNFT from "./WithdrawalNFT";
import TransferNFT from "./TransferNFT";
import getTrimmedTxHash from "../../utils/getTrimmedTxHash";
import useCheckTxConfirmation from "../../hooks/useCheckTxConfirmation";
import NoTransactionFound from "./NoTransactionFound";

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

const PendingTxOrFallback: React.FC<{ txId: string }> = ({ txId }) => {
  const router = useRouter();
  const { data: tokensData } = useTokens();
  const txIdSplit = txId.split("-");
  const txHash = txIdSplit[0];
  const txType = txIdSplit[1];

  const { data, isLoading, error } = usePendingTransactionData(txType, txHash);
  const { data: confirmedTx } = useCheckTxConfirmation(
    data && data[dataKey[txType]]
  );

  const getParsedTxData = (transaction) => {
    switch (txType) {
      case "trade":
        // const tradeData = transaction.trades[0];
        return null;
      case "joinAmm":
        return null;
      case "exitAmm":
        return null;
      case "transfer":
      case "withdraw":
        const transactionData = transaction?.transactions[0];
        if (!transactionData) {
          return null;
        }

        const {
          receiver,
          receiverAddress,
          senderAddress,
          amount,
          symbol,
          feeTokenSymbol,
          feeAmount,
          blockIdInfo,
          storageInfo,
          timestamp,
        } = transactionData;
        return {
          block: {
            id: blockIdInfo.blockId,
            timestamp,
          },
          fromAccount: {
            id: storageInfo.accountId,
            address: senderAddress,
          },
          toAccount: {
            id: receiver,
            address: receiverAddress,
          },
          token: {
            symbol,
            decimals:
              tokensData.find((token) => token.tokenId == storageInfo.tokenId)
                ?.decimals ?? 0,
          },
          feeToken: {
            symbol: feeTokenSymbol,
            decimals:
              tokensData.find((token) => token.symbol === feeTokenSymbol)
                ?.decimals ?? 0,
          },
          fee: feeAmount,
          amount,
        };
      case "deposit":
        const depositData = transaction.transactions[0];
        return {
          block: {
            id: depositData.blockIdInfo.blockId,
            timestamp: depositData.timestamp,
          },
          toAccount: {
            id: depositData.storageInfo.accountId,
            address: depositData.receiverAddress,
          },
          token: {
            symbol: depositData.symbol,
            decimals:
              tokensData.find(
                (token) => token.tokenId == depositData.storageInfo.tokenId
              )?.decimals ?? 0,
          },
          fee: depositData.feeAmount,
          amount: depositData.amount,
        };
      case "nftMint":
        const nftMintData = transaction.mints[0];
        return {
          block: { id: nftMintData.blockIdInfo.blockId },
          minter: {
            id: nftMintData.minterId,
            address: nftMintData.minterAddress,
          },
          receiver: {
            address: nftMintData.owner,
          },
          fee: nftMintData.feeAmount,
          feeToken: {
            symbol: nftMintData.feeTokenSymbol,
            decimals:
              tokensData.find(
                (token) => token.symbol == nftMintData.feeTokenSymbol
              )?.decimals ?? 0,
          },
          nft: {
            nftData: nftMintData.nftData,
          },
        };
      case "nftWithdraw":
        const nftWithdrawData = transaction.transfers[0];
        return {
          block: {
            id: nftWithdrawData.blockIdInfo.blockId,
            timestamp: nftWithdrawData.updatedAt,
          },
          fromAccount: {
            id: nftWithdrawData.accountId,
            address: nftWithdrawData.owner,
          },
          fee: nftWithdrawData.feeAmount,
          feeToken: {
            symbol: nftWithdrawData.feeTokenSymbol,
            decimals:
              tokensData.find(
                (token) => token.symbol == nftWithdrawData.feeTokenSymbol
              )?.decimals ?? 0,
          },
          nfts: [],
        };
      case "nftTransfer":
        const nftTransferData = transaction.transfers[0];
        return {
          block: {
            id: nftTransferData.blockIdInfo.blockId,
            timestamp: nftTransferData.updatedAt,
          },
          fromAccount: {
            id: nftTransferData.payeeId,
            address: nftTransferData.payeeAddress,
          },
          toAccount: {
            id: nftTransferData.accountId,
            address: nftTransferData.owner,
          },
          fee: nftTransferData.feeAmount,
          feeToken: {
            symbol: nftTransferData.feeTokenSymbol,
            decimals:
              tokensData.find(
                (token) => token.symbol == nftTransferData.feeTokenSymbol
              )?.decimals ?? 0,
          },
          nfts: [],
        };
    }
  };

  const renderTransactionDetails = (transaction) => {
    const parsedTxData = getParsedTxData(transaction);
    if (!parsedTxData) {
      return <NoTransactionFound />;
    }
    switch (txType) {
      case "trade":
        // return <OrderbookTrade transaction={parsedTxData} />;
        return null;
      case "joinAmm":
        return <Add transaction={transaction} isPending />;
      case "exitAmm":
        return <Remove transaction={transaction} isPending />;
      case "transfer":
        return <Transfer transaction={parsedTxData} isPending />;
      case "withdraw":
        return <Withdrawal transaction={parsedTxData} isPending />;
      case "deposit":
        return <Deposit transaction={parsedTxData} isPending />;
      case "nftMint":
        return <MintNFT transaction={parsedTxData} isPending />;
      case "nftWithdraw":
        return <WithdrawalNFT transaction={parsedTxData} isPending />;
      case "nftTransfer":
        return <TransferNFT transaction={parsedTxData} isPending />;
      default:
        return null;
    }
  };

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

    return null;
  }

  if (isLoading || !tokensData) {
    return null;
  }

  if (!isLoading && !data) {
    return (
      <div className="text-gray-400 dark:text-white text-2xl h-48 flex items-center justify-center w-full border">
        {error ?? <NoTransactionFound />}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-loopring-dark-background rounded p-4">
      <h1 className="text-3xl mb-5 flex items-center">
        Transaction #{getTrimmedTxHash(txHash, 10, true)}
      </h1>
      <table className="w-full table-auto table-fixed">
        <tbody>{renderTransactionDetails(data)}</tbody>
      </table>
    </div>
  );
};

export default PendingTxOrFallback;
