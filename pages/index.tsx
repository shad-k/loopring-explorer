import { gql } from "graphql-request";
import useSWR from "swr";

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
    <div>
      <h1>Loopring Explorer</h1>

      <div className="flex justify-around">
        <div>
          <h2>Latest Blocks</h2>
          <ul>
            {data &&
              data.blocks.map((block) => {
                return (
                  <li className="w-full flex justify-between items-center">
                    Block #{block.id} {block.blockHash}
                  </li>
                );
              })}
          </ul>
        </div>
        <div>
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
