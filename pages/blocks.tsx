import React from "react";

import useBlocks from "../hooks/useBlocks";

import Pagination from "../components/Pagination";

import getDateString from "../utils/getDateString";
import getTrimmedTxHash from "../utils/getTrimmedTxHash";
import { useRouter } from "next/router";

const Home: React.FC<{}> = () => {
  const [currentPage, setPage] = React.useState(1);
  const { data, error, isLoading } = useBlocks((currentPage - 1) * 10, 10);
  const router = useRouter();

  const pageChangeHandler = (page) => {
    router.push({ pathname: router.pathname, query: { page } }, undefined, {
      shallow: true,
    });
    setPage(page);
  };

  return (
    <div className="bg-white shadow-custom rounded p-4">
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
                <tr className="border" key={block.id}>
                  <td className="p-1">{block.id}</td>
                  <td>{getDateString(block.timestamp)}</td>
                  <td>{getTrimmedTxHash(block.txHash, 15)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        total={data && data.proxy.blockCount}
        onPageChange={pageChangeHandler}
      />
    </div>
  );
};

export default Home;
