import Link from "next/link";

import useBlocks from "../hooks/useBlocks";
import useTransactions from "../hooks/useTransactions";

import AppLink from "../components/AppLink";
import TableLoader from "../components/TableLoader";

import getDateString from "../utils/getDateString";
import getTrimmedTxHash from "../utils/getTrimmedTxHash";

export default function Home() {
  const { data, error, isLoading } = useBlocks();
  const {
    data: txsData,
    error: txError,
    isLoading: txIsLoading,
  } = useTransactions();

  return (
    <div className="flex mt-10 justify-around">
      <div className="bg-white shadow-custom rounded p-4 w-6/12 min-h-table">
        <h2 className="text-center text-2xl">Latest Blocks</h2>
        <table className="table-auto w-full border-collapse border">
          <thead className="text-left border">
            <tr>
              <th className="p-1">Block ID</th>
              <th>Submitted At</th>
              <th>L1 Tx</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.blocks.map((block) => {
                return (
                  <tr className="border" key={block.id}>
                    <td className="p-1">
                      <AppLink path="block" block={block.id}>
                        {block.id}
                      </AppLink>
                    </td>
                    <td>{getDateString(block.timestamp)}</td>
                    <td>
                      <AppLink
                        path="transaction"
                        tx={block.txHash}
                        isExplorerLink
                      >
                        {getTrimmedTxHash(block.txHash, 15)}
                      </AppLink>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isLoading && <TableLoader />}
        <Link href="/blocks">
          <a className="bg-indigo-700 text-white text-center m-auto mt-5 w-2/5 block rounded py-2">
            View More Blocks
          </a>
        </Link>
      </div>
      <div className="bg-white shadow-custom rounded p-4 w-5/12 min-h-table">
        <h2 className="text-center text-2xl">Latest Transactions</h2>
        <table className="table-auto w-full border-collapse border">
          <thead className="text-left border">
            <tr>
              <th className="p-1">Transaction ID</th>
              <th>Block ID</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {txsData &&
              txsData.transactions.map((tx) => {
                return (
                  <tr className="border" key={tx.id}>
                    <td className="p-1">
                      <AppLink path="transaction" tx={tx.id}>
                        {tx.id}
                      </AppLink>
                    </td>
                    <td>
                      <AppLink path="block" block={tx.block.id}>
                        {tx.block.id}
                      </AppLink>
                    </td>
                    <td>{getDateString(tx.block.timestamp)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {txIsLoading && <TableLoader />}
        <Link href="/transactions">
          <a className="bg-indigo-700 text-white text-center m-auto mt-5 w-3/6 block rounded py-2">
            View More Transactions
          </a>
        </Link>
      </div>
    </div>
  );
}
