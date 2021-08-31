import Link from "next/link";

import useBlocks from "../hooks/useBlocks";
import useTransactions from "../hooks/useTransactions";

import AppLink from "../components/AppLink";
import TableLoader from "../components/TableLoader";

import getDateString from "../utils/getDateString";
import getTimeFromNow from "../utils/getTimeFromNow";
import getTrimmedTxHash from "../utils/getTrimmedTxHash";
import getTokenAmount from "../utils/getTokenAmount";

export default function Home() {
  const { data, error, isLoading } = useBlocks();
  const {
    data: txsData,
    error: txError,
    isLoading: txIsLoading,
  } = useTransactions();

  return (
    <div className="mt-10 w-11/12 m-auto">
      <div className="grid grid-cols-3 gap-16">
        <div className="flex flex-col px-8 py-4 rounded-xl pb-10 border-2 border-loopring-blue text-loopring-lightBlue items-center justify-center h-32">
          <span className=" mb-4">Transactions</span>
          <span className="text-3xl flex-1">
            {txsData && txsData.proxy.transactionCount}
          </span>
        </div>
        <div className="flex flex-col px-8 py-2 rounded-xl pb-10 border-2 border-loopring-blue text-loopring-lightBlue items-center justify-center h-32">
          <span className=" mb-4">Blocks Submitted</span>
          <span className="text-3xl flex-1">
            {data && data.proxy.blockCount}
          </span>
        </div>
        <div className="flex flex-col px-8 py-2 rounded-xl pb-10 border-2 border-loopring-blue text-loopring-lightBlue items-center justify-center h-32">
          <span className=" mb-4">L2 Accounts</span>
          <span className="text-3xl flex-1">20,000</span>
        </div>
        <div className="flex flex-col px-8 py-2 rounded-xl pb-10 border-2 border-loopring-blue text-loopring-lightBlue items-center justify-center h-32">
          <span className=" mb-4">Avg. Block Time</span>
          <span className="text-3xl flex-1">30 mins</span>
        </div>
        <div className="flex flex-col px-8 py-2 rounded-xl pb-10 border-2 border-loopring-blue text-loopring-lightBlue items-center justify-center h-32">
          <span className=" mb-4">Avg. Txs per Block</span>
          <span className="text-3xl flex-1">1000</span>
        </div>
        <div className="flex flex-col px-8 py-2 rounded-xl pb-10 border-2 border-loopring-blue text-loopring-lightBlue items-center justify-center h-32">
          <span className=" mb-4">Last Block Submitted</span>
          <span className="text-3xl flex-1">
            {data && getTimeFromNow(data.blocks[0].timestamp)} ago
          </span>
        </div>
      </div>
      <div className="w-full mt-8 flex flex-col justify-between">
        <h2 className="text-2xl font-bold p-2 text-loopring-blue">
          Latest Blocks
        </h2>
        <table className="table-auto w-full border">
          <thead className="border border-loopring-blue bg-loopring-blue text-white">
            <tr>
              <th className="p-2">Block ID</th>
              <th>L1 Tx</th>
              <th>Size</th>
              <th>Fee</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data &&
              data.blocks.map((block) => {
                return (
                  <tr key={block.id} className="ml-2">
                    <td className="py-2 border-b text-center">
                      <AppLink path="block" block={block.id}>
                        {block.id}
                      </AppLink>
                    </td>
                    <td className="border-b">
                      <AppLink
                        path="transaction"
                        tx={block.txHash}
                        isExplorerLink
                      >
                        {getTrimmedTxHash(block.txHash, 15)}
                      </AppLink>
                    </td>
                    <td className="border-b text-loopring-gray">
                      {block.blockSize}
                    </td>
                    <td className="border-b text-loopring-gray">
                      {getTokenAmount(
                        block.gasPrice * block.gasUsed,
                        18
                      ).toFixed(2)}{" "}
                      ETH
                    </td>
                    <td className="border-b text-loopring-gray">
                      {getDateString(block.timestamp)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isLoading && <TableLoader />}
        {error && (
          <div className="flex items-center justify-center text-red-400 text-xl border h-4/6">
            Couldn't fetch blocks
          </div>
        )}
        <Link href="/blocks">
          <a className="bg-loopring-darkBlue text-white text-center mt-5 block rounded-lg py-2 px-6 self-end">
            View More Blocks
          </a>
        </Link>
      </div>
      <div className="w-full mt-8 flex flex-col justify-between">
        <h2 className="text-2xl font-bold p-2 text-loopring-blue">
          Latest Transactions
        </h2>
        <table className="table-auto w-full border">
          <thead className="border border-loopring-blue bg-loopring-blue text-white">
            <tr>
              <th className="p-2">Transaction ID</th>
              <th>Block ID</th>
              <th>Submitted At</th>
              <th>Transaction Type</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {txsData &&
              txsData.transactions.map((tx) => {
                return (
                  <tr className="border" key={tx.id}>
                    <td className="py-2 border-b">
                      <AppLink path="transaction" tx={tx.id}>
                        {tx.id}
                      </AppLink>
                    </td>
                    <td className="py-2 border-b">
                      <AppLink path="block" block={tx.block.id}>
                        {tx.block.id}
                      </AppLink>
                    </td>
                    <td className="py-2 border-b">
                      {getDateString(tx.block.timestamp)}
                    </td>
                    <td className="py-2 border-b">{tx.__typename}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {txIsLoading && <TableLoader />}
        {txError && (
          <div className="h-4/6 flex items-center justify-center text-red-400 text-xl">
            Couldn't fetch transactions
          </div>
        )}
        <Link href="/transactions">
          <a className="bg-loopring-darkBlue text-white text-center mt-5 mb-6 block rounded-lg py-2 px-6 self-end">
            View More Transactions
          </a>
        </Link>
      </div>
    </div>
  );
}
