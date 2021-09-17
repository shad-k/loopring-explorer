import React from "react";
import { useRouter } from "next/router";

import useBlocks from "../hooks/useBlocks";

import TableLoader from "../components/TableLoader";
import Pagination from "../components/Pagination";
import AppLink from "../components/AppLink";

import getTimeFromNow from "../utils/getTimeFromNow";
import getTrimmedTxHash from "../utils/getTrimmedTxHash";
import getTokenAmount from "../utils/getTokenAmount";

const Blocks: React.FC<{}> = () => {
  const router = useRouter();
  const [currentPage, setPage] = React.useState<number>(1);
  const { data, error, isLoading } = useBlocks((currentPage - 1) * 25, 25);

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
      {data && data.blocks && data.blocks.length === 0 && (
        <div className="text-gray-400 text-2xl h-40 flex items-center justify-center w-full border">
          No blocks to show
        </div>
      )}
      {isLoading && <TableLoader rows={25} />}
      {error && (
        <div className="h-40 flex items-center justify-center text-red-400 text-xl">
          Couldn't fetch blocks
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        total={data && data.proxy.blockCount}
        onPageChange={pageChangeHandler}
        entriesPerPage={25}
      />
    </div>
  );
};

export default Blocks;
