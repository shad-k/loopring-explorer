import React from "react";
import Image from "next/image";

import AppLink from "../AppLink";
import getDateString from "../../utils/getDateString";
import getTokenAmount from "../../utils/getTokenAmount";
import getTrimmedTxHash from "../../utils/getTrimmedTxHash";

interface ISwapProps {
  transaction: any;
  isPending?: boolean;
}

const Swap: React.FC<ISwapProps> = ({ transaction, isPending = false }) => {
  const [priceDirectionAtoB, setPriceDirectionAtoB] =
    React.useState<boolean>(true);
  const {
    block,
    account,
    tokenA,
    tokenB,
    data,
    fillSA,
    fillSB,
    tokenAPrice,
    tokenBPrice,
    pair,
    feeA,
    feeB,
    pool,
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
        <td>{__typename}</td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">User Account</td>
        <td>
          <AppLink
            path="account"
            accountId={account.id}
            address={account.address}
          >
            <span className="hidden lg:block">{account.address}</span>
            <span className="lg:hidden">
              {getTrimmedTxHash(account.address, 10, true)}
            </span>
          </AppLink>
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Swap</td>
        <td>
          <AppLink path="pair" pair={pair.id}>
            {getTokenAmount(fillSA, tokenA.decimals)} {tokenA.symbol} &harr;{" "}
            {getTokenAmount(fillSB, tokenB.decimals)} {tokenB.symbol}{" "}
          </AppLink>
          <button
            className="hover:bg-blue-100 lg:p-2 lg:mx-2 rounded hover:underline"
            onClick={() => setPriceDirectionAtoB((val) => !val)}
          >
            (
            {priceDirectionAtoB ? (
              <>
                1 {tokenA.symbol} ={" "}
                {getTokenAmount(tokenAPrice, tokenB.decimals)} {tokenB.symbol}
              </>
            ) : (
              <>
                1 {tokenB.symbol} ={" "}
                {getTokenAmount(tokenBPrice, tokenA.decimals)} {tokenA.symbol}
              </>
            )}
            )
          </button>
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Fee</td>
        <td>
          {feeA > 0
            ? `${getTokenAmount(feeA, tokenB.decimals)} ${tokenB.symbol}`
            : feeB > 0
            ? `${getTokenAmount(feeB, tokenA.decimals)} ${tokenA.symbol}`
            : null}
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Pool</td>
        <td>
          <AppLink path="account" accountId={pool.id} address={pool.address}>
            <span className="hidden lg:block">{pool.address}</span>
            <span className="lg:hidden">
              {getTrimmedTxHash(pool.address, 10, true)}
            </span>
          </AppLink>
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

export default Swap;
