import Link from "next/link";
import numeral from "numeral";

import useBlocks from "../hooks/useBlocks";
import useTransactions from "../hooks/useTransactions";

import AppLink from "../components/AppLink";
import TransactionTableDetails from "../components/transactionDetail/TransactionTableDetails";
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-16">
        <div className="flex flex-col px-8 py-4 rounded-xl pb-10 border-2 border-loopring-blue text-loopring-lightBlue items-center justify-center h-32">
          <span className=" mb-4">Transactions</span>
          <span className="text-3xl flex-1">
            {txsData && numeral(txsData.proxy.transactionCount).format("0,0")}
          </span>
        </div>
        <div className="flex flex-col px-8 py-2 rounded-xl pb-10 border-2 border-loopring-blue text-loopring-lightBlue items-center justify-center h-32">
          <span className=" mb-4">Blocks Submitted</span>
          <span className="text-3xl flex-1">
            {data && numeral(data.proxy.blockCount).format("0,0")}
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
          <span className="text-3xl flex-1">{numeral(1000).format("0,0")}</span>
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
        <div className="w-full overflow-x-auto">
          <table className="table-auto w-full border">
            <thead className="border border-loopring-blue bg-loopring-blue text-white">
              <tr>
                <th className="p-2 whitespace-nowrap">Block ID</th>
                <th className="p-2 whitespace-nowrap">L1 Tx</th>
                <th className="p-2 whitespace-nowrap">Size</th>
                <th className="p-2 whitespace-nowrap">Fee</th>
                <th className="p-2 whitespace-nowrap">Verified At</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {data &&
                data.blocks.map((block) => {
                  return (
                    <tr key={block.id} className="ml-2">
                      <td className="p-2 border-b whitespace-nowrap">
                        <AppLink path="block" block={block.id}>
                          {block.id}
                        </AppLink>
                      </td>
                      <td className="p-2 border-b whitespace-nowrap">
                        <AppLink
                          path="transaction"
                          tx={block.txHash}
                          isExplorerLink
                        >
                          {getTrimmedTxHash(block.txHash, 15)}
                        </AppLink>
                      </td>
                      <td className="p-2 border-b text-loopring-gray whitespace-nowrap">
                        {block.blockSize}
                      </td>
                      <td className="p-2 border-b text-loopring-gray whitespace-nowrap">
                        {getTokenAmount(
                          block.gasPrice * block.gasUsed,
                          18
                        ).toFixed(2)}{" "}
                        ETH
                      </td>
                      <td className="p-2 border-b text-loopring-gray whitespace-nowrap">
                        {getTimeFromNow(block.timestamp)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {isLoading && <TableLoader />}
        {error && (
          <div className="flex items-center justify-center text-red-400 text-xl border h-4/6">
            Couldn't fetch blocks
          </div>
        )}
        <Link href="/blocks">
          <a className="bg-loopring-darkBlue text-white text-center block rounded-lg py-2 px-6 w-2/3 lg:w-auto m-auto lg:mx-0 mt-5 lg:self-end">
            View More Blocks
          </a>
        </Link>
      </div>
      <div className="w-full mt-8 flex flex-col justify-between">
        <h2 className="text-2xl font-bold p-2 text-loopring-blue">
          Latest Transactions
        </h2>
        <div className="w-full overflow-x-auto">
          <table className="table-auto w-full border">
            <thead className="border border-loopring-blue bg-loopring-blue text-white break-none">
              <tr>
                <th className="p-2 whitespace-nowrap">Tx ID</th>
                <th className="p-2 whitespace-nowrap">Type</th>
                <th className="p-2 whitespace-nowrap">From</th>
                <th className="p-2 whitespace-nowrap">To</th>
                <th className="p-2 whitespace-nowrap">Amount</th>
                <th className="p-2 whitespace-nowrap">Verified At</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {txsData &&
                txsData.transactions.map((tx) => {
                  return (
                    <tr className="border" key={tx.id}>
                      <td className="p-2 border-b whitespace-nowrap">
                        <AppLink path="transaction" tx={tx.id}>
                          {tx.id}
                        </AppLink>
                      </td>
                      <td className="p-2 border-b whitespace-nowrap">
                        {tx.__typename}
                      </td>
                      <TransactionTableDetails
                        type={tx.__typename}
                        tx={tx}
                        cellClassName="p-2 border-b whitespace-nowrap"
                      />
                      <td className="p-2 border-b whitespace-nowrap">
                        {getTimeFromNow(tx.block.timestamp)} ago
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {txIsLoading && <TableLoader />}
        {txError && (
          <div className="h-4/6 flex items-center justify-center text-red-400 text-xl">
            Couldn't fetch transactions
          </div>
        )}
        <Link href="/transactions">
          <a className="bg-loopring-darkBlue text-white text-center block rounded-lg py-2 px-6 w-2/3 lg:w-auto m-auto lg:mx-0 mt-5 mb-6  lg:self-end">
            View More Transactions
          </a>
        </Link>
      </div>
    </div>
  );
}
