import React from "react";
import usePendingTxs from "../../hooks/usePendingTxs";
import useTokens from "../../hooks/useTokens";
import Add from "./Add";
import MintNFT from "./MintNFT";
import OrderbookTrade from "./OrderbookTrade";
import Remove from "./Remove";
import Transfer from "./Transfer";
import Withdrawal from "./Withdrawal";

const PendingTxOrFallback: React.FC<{ txId: string }> = ({ txId }) => {
  const { data, error, isLoading } = usePendingTxs();
  const { data: tokensData } = useTokens();

  const txIdSplit = txId.split("-");
  const accountId = txIdSplit[0];
  const storageId = txIdSplit[1];

  const checkIfTxExists = (transaction) => {
    switch (transaction.txType) {
      case "Transfer":
      case "Withdraw":
      case "JoinAmm":
      case "ExitAmm":
        return (
          transaction.accountId === parseInt(accountId) &&
          transaction.storageId === parseInt(storageId)
        );
      case "SpotTrade":
        return (
          (transaction.orderA.accountID === parseInt(accountId) &&
            transaction.orderA.storageID === parseInt(storageId)) ||
          (transaction.orderB.accountID === parseInt(accountId) &&
            transaction.orderB.storageID === parseInt(storageId))
        );
      case "NftMint":
        return (
          transaction.minterAccountId === parseInt(accountId) &&
          transaction.storageId === parseInt(storageId)
        );
      default:
        return false;
    }
  };

  const getParsedTxData = (transaction) => {
    switch (transaction.txType) {
      case "Transfer":
        const token =
          tokensData &&
          tokensData.find(
            ({ tokenId }) => tokenId === transaction.token.tokenId
          );
        const feeToken =
          tokensData &&
          tokensData.find(({ tokenId }) => tokenId === transaction.fee.tokenId);
        return {
          block: null,
          fromAccount: {
            id: transaction.accountId,
          },
          toAccount: {
            id: transaction.toAccountId,
            address: transaction.toAccountAddress,
          },
          token,
          feeToken,
          amount: transaction.token.amount,
          fee: transaction.fee.amount,
        };
      case "SpotTrade":
        const tokenA =
          tokensData &&
          tokensData.find(
            ({ tokenId }) => tokenId === transaction.orderA.tokenS
          );
        const tokenB =
          tokensData &&
          tokensData.find(
            ({ tokenId }) => tokenId === transaction.orderA.tokenB
          );
        return {
          accountA: { id: transaction.orderA.accountID },
          accountB: { id: transaction.orderB.accountID },
          tokenA,
          tokenB,
          fillSA: transaction.orderA.fillS,
          fillSB: transaction.orderB.fillS,
        };
      case "Withdraw":
        const withdrawToken =
          tokensData &&
          tokensData.find(
            ({ tokenId }) => tokenId === transaction.token.tokenId
          );
        const withdrawFeeToken =
          tokensData &&
          tokensData.find(({ tokenId }) => tokenId === transaction.fee.tokenId);
        return {
          fromAccount: {
            address: transaction.fromAddress,
          },
          token: withdrawToken,
          amount: transaction.token.amount,
          feeToken: withdrawFeeToken,
          fee: transaction.fee.amount,
        };
      case "JoinAmm":
        const joinToken =
          tokensData &&
          tokensData.find(
            ({ tokenId }) => tokenId === transaction.token.tokenId
          );
        const joinFeeToken =
          tokensData &&
          tokensData.find(({ tokenId }) => tokenId === transaction.fee.tokenId);
        return {
          account: { id: transaction.accountId },
          token: joinToken,
          pool: {
            id: transaction.toAccountId,
            address: transaction.toAccountAddress,
          },
          amount: transaction.token.amount,
          feeToken: joinFeeToken,
          fee: transaction.fee.amount,
        };
      case "ExitAmm":
        const removeToken =
          tokensData &&
          tokensData.find(
            ({ tokenId }) => tokenId === transaction.token.tokenId
          );
        const removeFeeToken =
          tokensData &&
          tokensData.find(({ tokenId }) => tokenId === transaction.fee.tokenId);
        return {
          account: { id: transaction.accountId },
          token: removeToken,
          pool: {
            id: transaction.toAccountId,
            address: transaction.toAccountAddress,
          },
          amount: transaction.token.amount,
          feeToken: removeFeeToken,
          fee: transaction.fee.amount,
        };
      case "NftMint":
        const nftMintFeeToken =
          tokensData &&
          tokensData.find(({ tokenId }) => tokenId === transaction.fee.tokenId);
        return {
          minter: {
            id: transaction.minterAccountId,
          },
          nft: {
            nftId: transaction.nftToken.nftId,
          },
          receiver: {
            id: transaction.toAccountId,
            address: transaction.toAccountAddress,
          },
          fee: transaction.fee.amount,
          feeToken: nftMintFeeToken,
        };
    }
  };

  const renderTransactionDetails = (transaction) => {
    const parsedTxData = getParsedTxData(transaction);
    switch (transaction.txType) {
      case "SpotTrade":
        return <OrderbookTrade transaction={parsedTxData} />;
      case "JoinAmm":
        return <Add transaction={transaction} />;
      case "ExitAmm":
        return <Remove transaction={transaction} />;
      case "Transfer":
        return <Transfer transaction={parsedTxData} />;
      case "NftMint":
        return <MintNFT transaction={parsedTxData} />;
      case "Withdraw":
        return <Withdrawal transaction={parsedTxData} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return null;
  }
  const txData = data.find((tx) => checkIfTxExists(tx));
  const isTxPending = !!txData;
  if (!isLoading && (!data || !isTxPending)) {
    return (
      <div className="text-gray-400 dark:text-white text-2xl h-40 flex items-center justify-center w-full border">
        {error ?? "No transaction found"}
      </div>
    );
  }

  return (
    <div className="border dark:border-loopring-dark-darkBlue rounded w-full mb-10 overflow-auto">
      <table className="w-full table-auto table-fixed">
        <tbody>{renderTransactionDetails(txData)}</tbody>
      </table>
    </div>
  );
};

export default PendingTxOrFallback;
