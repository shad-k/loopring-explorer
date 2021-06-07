import { gql } from "graphql-request";
import useSWR from "swr";
import Link from "next/link";

import SearchForm from "../components/SearchForm";
import getDateString from "../utils/getDateString";
import getTrimmedTxHash from "../utils/getTrimmedTxHash";

const FETCH_BLOCKS = gql`
  query blocks {
    blocks(first: 10, orderBy: id, orderDirection: desc) {
      id
      timestamp
      txHash
    }
  }
`;

const FETCH_TXS = gql`
  query transactions {
    transactions(first: 10, orderBy: id, orderDirection: desc) {
      id
      block {
        id
        timestamp
      }
    }
  }
`;

export default function Home() {
  const { data, error } = useSWR(FETCH_BLOCKS);
  const { data: txsData, error: txsError } = useSWR(FETCH_TXS);

  console.log(data, error);
  return (
    <div className="w-full lg:w-4/5 m-auto mt-12">
      <div className="h-56 rounded-2xl bg-gradient-to-b from-indigo-100 to-indigo-60 p-5">
        <h1 className="text-4xl text-center">Loopring Explorer</h1>
        <SearchForm className="flex md:w-3/5 m-auto" />
      </div>
      <div className="flex mt-10 justify-around">
        <div className="bg-white shadow-custom rounded p-4 w-5/12">
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
                    <tr className="border">
                      <td className="p-1">{block.id}</td>
                      <td>{getDateString(block.timestamp)}</td>
                      <td>{getTrimmedTxHash(block.txHash, 15)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <Link href="/blocks">
            <a className="bg-indigo-700 text-white text-center m-auto mt-5 w-2/5 block rounded py-2">
              View More Blocks
            </a>
          </Link>
        </div>
        <div className="bg-white shadow-custom rounded p-4 w-5/12">
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
                    <tr className="border">
                      <td className="p-1">{tx.id}</td>
                      <td>{tx.block.id}</td>
                      <td>{getDateString(tx.block.timestamp)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <Link href="/transactions">
            <a className="bg-indigo-700 text-white text-center m-auto mt-5 w-2/5 block rounded py-2">
              View More Transactions
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
