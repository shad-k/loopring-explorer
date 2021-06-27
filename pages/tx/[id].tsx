import React from "react";
import { useRouter } from "next/router";

import useTransaction from "../../hooks/useTransaction";
import getDateString from "../../utils/getDateString";
import AppLink from "../../components/AppLink";

const Transaction: React.FC<{}> = () => {
  const router = useRouter();
  const txId = router.query.id;
  const { data, error, isLoading } = useTransaction(txId);

  const {
    block,
    accountA,
    accountB,
    tokenA,
    tokenB,
    data: txData,
    fillSA,
    fillSB,
    __typename,
  } = (data && data.transaction) || {};

  return (
    <div className="bg-white shadow-custom rounded p-4">
      <h1 className="text-3xl mb-5">Transaction #{txId}</h1>
      <div className="border rounded w-full mb-10">
        {data && data.transaction && (
          <table className="w-full table-auto table-fixed">
            <tbody>
              <tr className="border">
                <td className="p-2 w-1/5">Block #</td>
                <td>
                  <AppLink path="block" block={block.id}>
                    {block.id}
                  </AppLink>
                </td>
              </tr>
              <tr className="border">
                <td className="p-2">Submitted at</td>
                <td>{getDateString(block.timestamp)}</td>
              </tr>
              <tr className="border">
                <td className="p-2">Transaction Type</td>
                <td>{__typename}</td>
              </tr>
              <tr className="border">
                <td className="p-2">Account 1</td>
                <td>
                  <AppLink path="account" accountId={accountA.id}>
                    {accountA.id}
                  </AppLink>
                  &nbsp; (
                  <AppLink
                    path="account"
                    accountId={accountA.address}
                    isExplorerLink
                  >
                    {accountA.address}
                  </AppLink>
                  )
                </td>
              </tr>
              <tr className="border">
                <td className="p-2">Account 2</td>
                <td>
                  <AppLink path="account" accountId={accountB.id}>
                    {accountB.id}
                  </AppLink>
                  &nbsp; (
                  <AppLink
                    path="account"
                    accountId={accountB.address}
                    isExplorerLink
                  >
                    {accountB.address}
                  </AppLink>
                  )
                </td>
              </tr>
              <tr className="border">
                <td className="p-2">Trade</td>
                <td>
                  {fillSA / Math.pow(10, tokenA.decimals)} {tokenA.symbol}{" "}
                  &harr; {fillSB / Math.pow(10, tokenB.decimals)}{" "}
                  {tokenB.symbol}
                </td>
              </tr>
              <tr className="border">
                <td className="p-2">Transaction Data</td>
                <td>
                  <div className="break-all bg-gray-100 h-32 overflow-auto m-2 rounded p-2 text-gray-500">
                    {txData}
                  </div>
                </td>
              </tr>
            </tbody>
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

// timestamp
//   txHash
//   gasUsed
//   gasPrice
//   height
//   blockHash
//   operatorAccountID
//   operatorAccount {
//     address
//   }
//   transactions {
//     id
//     hash
//   }
