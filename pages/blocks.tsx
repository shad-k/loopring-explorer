import React from 'react';

import TableLoader from '../components/TableLoader';
import AppLink from '../components/AppLink';
import CursorPagination from '../components/CursorPagination';
import usePagination from '../hooks/usePagination';
import { OrderDirection, useBlocksQuery } from '../generated/loopringExplorer';

import getTimeFromNow from '../utils/getTimeFromNow';
import getTrimmedTxHash from '../utils/getTrimmedTxHash';

const Blocks: React.FC<{}> = () => {
  const TOTAL_COUNT = 25;
  const { data, error, loading, fetchMore } = useBlocksQuery({
    variables: {
      first: TOTAL_COUNT,
      orderDirection: OrderDirection.Desc,
    },
  });

  const { afterCursor, beforeCursor, fetchNext, fetchPrevious, hasMore } = usePagination(
    data,
    'blocks',
    fetchMore,
    TOTAL_COUNT
  );

  return (
    <div className="bg-white dark:bg-loopring-dark-background rounded p-4 min-h-table">
      <h1 className="text-3xl mb-2 font-bold">Latest Blocks</h1>
      <div className="w-full overflow-auto">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-loopring-blue border border-loopring-blue dark:border-loopring-dark-darkBlue text-white text-center dark:bg-loopring-dark-darkBlue">
            <tr>
              <th className="p-2 whitespace-nowrap">Block ID</th>
              <th className="p-2 whitespace-nowrap">L1 Tx</th>
              <th className="p-2 whitespace-nowrap">Size</th>
              <th className="p-2 whitespace-nowrap">Verified At</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data &&
              data.blocks.map((block) => {
                return (
                  <tr key={block.id} className="border dark:border-loopring-dark-background ml-2">
                    <td className="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap">
                      <AppLink path="block" block={block.id}>
                        {block.id}
                      </AppLink>
                    </td>
                    <td className="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap">
                      <AppLink path="transaction" tx={block.txHash} isExplorerLink>
                        {getTrimmedTxHash(block.txHash, 15)}
                      </AppLink>
                    </td>
                    <td className="p-2 border-b dark:border-loopring-dark-darkBlue text-loopring-gray dark:text-white whitespace-nowrap">
                      {block.blockSize}
                    </td>
                    <td className="p-2 border-b dark:border-loopring-dark-darkBlue text-loopring-gray dark:text-white whitespace-nowrap">
                      {getTimeFromNow(block.timestamp)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {data && data.blocks && data.blocks.length === 0 && (
        <div className="text-gray-400 dark:text-white dark:text-loopring-dark-gray text-2xl h-40 flex items-center justify-center w-full border">
          No blocks to show
        </div>
      )}
      {loading && <TableLoader rows={25} />}
      {error && <div className="h-40 flex items-center justify-center text-red-400 text-xl">Couldn't fetch blocks</div>}
      <CursorPagination
        onNextClick={() =>
          fetchNext({
            variables: {
              where: {
                internalID_lt: afterCursor,
              },
            },
          })
        }
        onPreviousClick={() =>
          fetchPrevious({
            variables: {
              where: {
                internalID_gt: beforeCursor,
              },
              orderDirection: OrderDirection.Asc,
            },
            updateQuery(_, data) {
              return {
                blocks: data.fetchMoreResult.blocks.reverse(),
              };
            },
          })
        }
        hasMore={hasMore}
      />
    </div>
  );
};

export default Blocks;
