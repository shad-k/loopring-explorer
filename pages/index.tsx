import { gql } from "graphql-request";
import useSWR from "swr";

import SearchForm from "../components/SearchForm";

const FETCH_BLOCKS = gql`
  query blocks {
    blocks(first: 10, orderBy: id, orderDirection: desc) {
      id
      blockHash
      timestamp
    }
  }
`;

const FETCH_TXS = gql`
  query transactions {
    transactions(first: 10, orderBy: id, orderDirection: desc) {
      id
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
        <h1 className="text-3xl text-center">Loopring Explorer</h1>
        <SearchForm className="flex md:w-3/5 m-auto" />
      </div>
      <div className="flex mt-10 justify-between">
        <div className="bg-white shadow-custom rounded p-4 w-5/12">
          <h2>Latest Blocks</h2>
          <ul>
            {data &&
              data.blocks.map((block) => {
                return (
                  <li className="w-full flex justify-between items-center">
                    Block #{block.id}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="bg-white shadow-custom rounded p-4 w-5/12">
          <h2>Latest Transactions</h2>
          <ul>
            {txsData &&
              txsData.transactions.map((tx) => {
                return (
                  <li className="w-full flex justify-between items-center">
                    Block #{tx.id}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
