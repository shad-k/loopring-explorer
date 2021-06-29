import React from "react";
import { useRouter } from "next/router";

import useTransaction from "../../hooks/useTransaction";
import SpotTrade from "../../components/transactionDetail/SpotTrade";
import Deposit from "../../components/transactionDetail/Deposit";
import Withdrawal from "../../components/transactionDetail/Withdrawal";
import Transfer from "../../components/transactionDetail/Transfer";
import AccountUpdate from "../../components/transactionDetail/AccountUpdate";

const Transaction: React.FC<{}> = () => {
  const router = useRouter();
  const txId = router.query.id;
  const { data, error, isLoading } = useTransaction(txId);

  const { __typename } = (data && data.transaction) || {};

  const renderTransactionDetails = (type) => {
    switch (type) {
      case "SpotTrade":
        return <SpotTrade transaction={data.transaction} />;
      case "Deposit":
        return <Deposit transaction={data.transaction} />;
      case "Withdrawal":
        return <Withdrawal transaction={data.transaction} />;
      case "Transfer":
        return <Transfer transaction={data.transaction} />;
      case "AccountUpdate":
        return <AccountUpdate transaction={data.transaction} />;
      default:
        return type;
    }
  };

  return (
    <div className="bg-white shadow-custom rounded p-4">
      <h1 className="text-3xl mb-5">Transaction #{txId}</h1>
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
