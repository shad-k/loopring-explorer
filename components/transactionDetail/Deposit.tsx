import React from "react";
import Image from "next/image";

import AppLink from "../AppLink";
import getDateString from "../../utils/getDateString";
import getTokenAmount from "../../utils/getTokenAmount";
import getTrimmedTxHash from "../../utils/getTrimmedTxHash";

interface IDepositProps {
  transaction: any;
  isPending?: boolean;
}

const Deposit: React.FC<IDepositProps> = ({
  transaction,
  isPending = false,
}) => {
  const { block, toAccount, token, amount, data } = transaction;

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
        <td className="p-2">Status</td>
        <td>
          {isPending ? (
            <span className="italic">Pending</span>
          ) : (
            <div className="flex items-center ">
              <Image src={"/green-tick.svg"} height={20} width={20} />{" "}
              <span className="ml-2">{getDateString(block.timestamp)}</span>
            </div>
          )}
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Transaction Type</td>
        <td>Deposit</td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Deposited From</td>
        <td>
          <AppLink
            path="account"
            accountId={toAccount.id}
            address={toAccount.address}
          >
            <span className="hidden lg:block">
              {toAccount.address || toAccount.id}
            </span>
            <span className="lg:hidden">
              {toAccount.address
                ? getTrimmedTxHash(toAccount.address, 10, true)
                : toAccount.id}
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
      {data && (
        <tr className="border dark:border-loopring-dark-darkBlue">
          <td className="p-2">Transaction Data</td>
          <td>
            <div className="break-all bg-gray-100 dark:bg-loopring-dark-darkBlue h-32 overflow-auto m-2 rounded p-2 text-gray-500">
              {data}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default Deposit;
