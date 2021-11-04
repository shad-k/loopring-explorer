import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import useBlock from "../hooks/useBlock";
import getDateString from "../utils/getDateString";
import AppLink from "../components/AppLink";
import Transactions from "./transactions";
import getTrimmedTxHash from "../utils/getTrimmedTxHash";

const Block: React.FC<{}> = () => {
  const router = useRouter();
  const blockId = router.asPath.replace(/\/block\/\#\/(\d+)\??/, "$1");
  const { data, error, isLoading } = useBlock(blockId);

  const blockCount = data ? data.proxy.blockCount : null;
  const blockIdInt = blockId ? parseInt(blockId as string) : null;

  return (
    <div className="bg-white dark:bg-loopring-dark-background rounded p-4">
      <h1 className="text-3xl mb-5 flex items-center">
        Block #{blockId}
        {blockIdInt > 1 && (
          <Link href={`/block/${blockIdInt - 1}`}>
            <a className="text-sm bg-loopring-lightBlue px-2 text-white relative h-5 rounded ml-2">
              ‹
            </a>
          </Link>
        )}
        {blockCount && blockIdInt < blockCount && (
          <Link href={`/block/${blockIdInt + 1}`}>
            <a className="text-sm bg-loopring-lightBlue px-2 text-white relative h-5 rounded ml-2">
              ›
            </a>
          </Link>
        )}
      </h1>
      <div className="border dark:border-loopring-dark-darkBlue rounded w-full mb-10">
        {data && data.block && (
          <table className="w-full table-auto table-fixed">
            <tbody>
              <tr className="border dark:border-loopring-dark-darkBlue">
                <td className="p-2 lg:w-1/5">Block Hash</td>
                <td className="break-all">{data.block.blockHash}</td>
              </tr>
              <tr className="border dark:border-loopring-dark-darkBlue">
                <td className="p-2">Block Size</td>
                <td>{data.block.blockSize}</td>
              </tr>
              <tr className="border dark:border-loopring-dark-darkBlue">
                <td className="p-2">L1 Transaction Hash</td>
                <td className="break-all">
                  <AppLink
                    path="transaction"
                    isExplorerLink
                    tx={data.block.txHash}
                  >
                    <span className="hidden lg:block">{data.block.txHash}</span>
                    <span className="lg:hidden">
                      {getTrimmedTxHash(data.block.txHash, 10)}
                    </span>
                  </AppLink>
                </td>
              </tr>
              <tr className="border dark:border-loopring-dark-darkBlue">
                <td className="p-2">Verified at</td>
                <td>{getDateString(data.block.timestamp)}</td>
              </tr>
              <tr className="border dark:border-loopring-dark-darkBlue">
                <td className="p-2">Operator Address</td>
                <td className="break-all">
                  <AppLink
                    path="account"
                    accountId={data.block.operatorAccount.id}
                  >
                    <span className="hidden lg:block">
                      {data.block.operatorAccount.address}
                    </span>
                    <span className="lg:hidden">
                      {getTrimmedTxHash(
                        data.block.operatorAccount.address,
                        10,
                        true
                      )}
                    </span>
                  </AppLink>
                </td>
              </tr>
              <tr className="border dark:border-loopring-dark-darkBlue">
                <td className="p-2">Raw Data</td>
                <td>
                  <div className="break-all bg-gray-100 dark:bg-loopring-dark-darkBlue h-32 overflow-auto m-2 rounded p-2 text-gray-500">
                    {data.block.data}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      {data && data.block && (
        <Transactions
          blockIDFilter={blockId as string}
          transactionCounts={{
            transactionCount: data.block.transactionCount,
            depositCount: data.block.depositCount,
            withdrawalCount: data.block.withdrawalCount,
            transferCount: data.block.transferCount,
            addCount: data.block.addCount,
            removeCount: data.block.removeCount,
            orderbookTradeCount: data.block.orderbookTradeCount,
            swapCount: data.block.swapCount,
            accountUpdateCount: data.block.accountUpdateCount,
            ammUpdateCount: data.block.ammUpdateCount,
            signatureVerificationCount: data.block.signatureVerificationCount,
          }}
        />
      )}
      {data && !isLoading && !data.block && (
        <div className="text-gray-400 text-2xl h-40 flex items-center justify-center w-full border">
          No block found
        </div>
      )}
    </div>
  );
};

export default Block;
