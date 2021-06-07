import { gql } from "graphql-request";
import useSWR from "swr";
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

export default function Home() {
  const { data, error } = useSWR(FETCH_BLOCKS);

  return (
    <div className="w-full lg:w-4/5 m-auto mt-12">
      <SearchForm className="float-right flex md:w-2/5 m-auto mb-5" />
      <div className="clear-right">
        <h1 className="text-3xl mb-5">Latest Blocks</h1>
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
      </div>
    </div>
  );
}
