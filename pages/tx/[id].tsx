import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import useTransaction from "../../hooks/useTransaction";
import Deposit from "../../components/transactionDetail/Deposit";
import Withdrawal from "../../components/transactionDetail/Withdrawal";
import Transfer from "../../components/transactionDetail/Transfer";
import AccountUpdate from "../../components/transactionDetail/AccountUpdate";
import SignatureVerification from "../../components/transactionDetail/SignatureVerification";
import AmmUpdate from "../../components/transactionDetail/AmmUpdate";
import Add from "../../components/transactionDetail/Add";
import Remove from "../../components/transactionDetail/Remove";
import Swap from "../../components/transactionDetail/Swap";
import OrderbookTrade from "../../components/transactionDetail/OrderbookTrade";

const Transaction: React.FC<{}> = () => {
  const router = useRouter();
  const txId = router.query.id;
  const { data, error, isLoading } = useTransaction(txId);

  const { __typename, block } = (data && data.transaction) || {};

  const renderTransactionDetails = (type) => {
    switch (type) {
      case "Add":
        return <Add transaction={data.transaction} />;
      case "Remove":
        return <Remove transaction={data.transaction} />;
      case "Swap":
        return <Swap transaction={data.transaction} />;
      case "OrderbookTrade":
        return <OrderbookTrade transaction={data.transaction} />;
      case "Deposit":
        return <Deposit transaction={data.transaction} />;
      case "Withdrawal":
        return <Withdrawal transaction={data.transaction} />;
      case "Transfer":
        return <Transfer transaction={data.transaction} />;
      case "AccountUpdate":
        return <AccountUpdate transaction={data.transaction} />;
      case "SignatureVerification":
        return <SignatureVerification transaction={data.transaction} />;
      case "AmmUpdate":
        return <AmmUpdate transaction={data.transaction} />;
      default:
        return type;
    }
  };

  const transactionCount = block ? block.transactionCount - 1 : null;
  const txInBlock = txId && parseInt((txId as string).split("-")[1]);

  return (
    <div className="bg-white shadow-custom rounded p-4">
      <h1 className="text-3xl mb-5 flex items-center">
        Transaction #{txId}
        {txInBlock > 0 && (
          <Link href={block ? `/tx/${block.id}-${txInBlock - 1}` : ""}>
            <a className="text-sm bg-loopring-lightBlue px-2 text-white relative h-5 rounded ml-2">
              ‹
            </a>
          </Link>
        )}
        {transactionCount && txInBlock < transactionCount && (
          <Link href={block ? `/tx/${block.id}-${txInBlock + 1}` : ""}>
            <a className="text-sm bg-loopring-lightBlue px-2 text-white relative h-5 rounded ml-2">
              ›
            </a>
          </Link>
        )}
      </h1>
      <div className="border rounded w-full mb-10">
        {data && data.transaction && (
          <table className="w-full table-auto table-fixed">
            <tbody>{renderTransactionDetails(__typename)}</tbody>
          </table>
        )}
      </div>
      {data && !isLoading && !data.transaction && (
        <div className="text-gray-400 text-2xl h-40 flex items-center justify-center w-full border">
          No transaction found
        </div>
      )}
    </div>
  );
};

export default Transaction;
