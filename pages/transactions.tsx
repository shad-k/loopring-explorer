import { gql } from "graphql-request";
import useSWR from "swr";
import SearchForm from "../components/SearchForm";

import getDateString from "../utils/getDateString";

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
  const { data, error } = useSWR(FETCH_TXS);

  return (
    <div>
      <h1 className="text-3xl mb-5">Latest Transactions</h1>
      <table className="table-auto w-full border-collapse border">
        <thead className="text-left border">
          <tr>
            <th className="p-1">Transaction ID</th>
            <th>Block ID</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.transactions.map((tx) => {
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
    </div>
  );
}
