import React from "react";

import AppLink from "../AppLink";
import getDateString from "../../utils/getDateString";
import getTokenAmount from "../../utils/getTokenAmount";
import getTrimmedTxHash from "../../utils/getTrimmedTxHash";

const Transfer: React.FC<{ transaction: any }> = ({ transaction }) => {
  const {
    block,
    fromAccount,
    toAccount,
    token,
    amount,
    feeToken,
    fee,
    data,
    __typename,
  } = transaction;

  return (
    <>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2 lg:w-1/5">Block #</td>
        <td>
          <AppLink path="block" block={block.id}>
            {block.id}
          </AppLink>
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Verified at</td>
        <td>{getDateString(block.timestamp)}</td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Transaction Type</td>
        <td>{__typename}</td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">From</td>
        <td>
          <AppLink
            path="account"
            accountId={fromAccount.id}
            address={fromAccount.address}
          >
            <span className="hidden lg:block">{fromAccount.address}</span>
            <span className="lg:hidden">
              {getTrimmedTxHash(fromAccount.address, 10, true)}
            </span>
          </AppLink>
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">to</td>
        <td>
          <AppLink
            path="account"
            accountId={toAccount.id}
            address={toAccount.address}
          >
            <span className="hidden lg:block">{toAccount.address}</span>
            <span className="lg:hidden">
              {getTrimmedTxHash(toAccount.address, 10, true)}
            </span>
          </AppLink>
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Amount</td>
        <td>
          {getTokenAmount(amount, token.decimals)} {token.symbol}
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Fee</td>
        <td>
          {getTokenAmount(fee, feeToken.decimals)} {feeToken.symbol}
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Transaction Data</td>
        <td>
          <div className="break-all bg-gray-100 dark:bg-loopring-dark-darkBlue h-32 overflow-auto m-2 rounded p-2 text-gray-500">
            {data}
          </div>
        </td>
      </tr>
    </>
  );
};

export default Transfer;
