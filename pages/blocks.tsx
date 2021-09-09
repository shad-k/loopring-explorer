import React from "react";
import { useRouter } from "next/router";

import useBlocks from "../hooks/useBlocks";

import TableLoader from "../components/TableLoader";
import Pagination from "../components/Pagination";
import AppLink from "../components/AppLink";

import getDateString from "../utils/getDateString";
import getTrimmedTxHash from "../utils/getTrimmedTxHash";

const Blocks: React.FC<{}> = () => {
  const router = useRouter();
  const [currentPage, setPage] = React.useState<number>(1);
  const { data, error, isLoading } = useBlocks((currentPage - 1) * 10, 10);

  const pageChangeHandler = (page) => {
    router.push({ pathname: router.pathname, query: { page } }, undefined, {
      shallow: true,
    });
  };

  React.useEffect(() => {
    if (router.query && router.query.page) {
      setPage(parseInt(router.query.page as string));
    }
  }, [router.query]);

  return (
    <div className="bg-white shadow-custom rounded p-4 min-h-table">
      <h1 className="text-3xl mb-5">Latest Blocks</h1>
      <div className="w-full overflow-auto">
        <table className="table-auto w-full border-collapse border">
          <thead className="border border-loopring-blue bg-loopring-blue text-white text-center">
            <tr>
              <th className="p-2 whitespace-nowrap">Block ID</th>
              <th className="p-2 whitespace-nowrap">Submitted At</th>
              <th className="p-2 whitespace-nowrap">L1 Tx</th>
              <th className="p-2 whitespace-nowrap">Included in L1 block</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data &&
              data.blocks.map((block) => {
                return (
                  <tr className="border" key={block.id}>
                    <td className="p-2 whitespace-nowrap">
                      <AppLink path="block" block={block.id}>
                        {block.id}
                      </AppLink>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      {getDateString(block.timestamp)}
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      {getTrimmedTxHash(block.txHash, 25)}
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <AppLink path="block" block={block.height} isExplorerLink>
                        {block.height}
                      </AppLink>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {data && data.blocks && data.blocks.length === 0 && (
        <div className="text-gray-400 text-2xl h-40 flex items-center justify-center w-full border">
          No transactions to show
        </div>
      )}
      {isLoading && <TableLoader />}
      {error && (
        <div className="h-40 flex items-center justify-center text-red-400 text-xl">
          Couldn't fetch blocks
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        total={data && data.proxy.blockCount}
        onPageChange={pageChangeHandler}
      />
    </div>
  );
};

export default Blocks;
