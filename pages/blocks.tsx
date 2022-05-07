import React from 'react';

import TableLoader from '../components/TableLoader';
import AppLink from '../components/AppLink';
import CursorPagination from '../components/CursorPagination';
import usePagination from '../hooks/usePagination';
import { OrderDirection, useBlocksQuery } from '../generated/loopringExplorer';

import getTimeFromNow from '../utils/getTimeFromNow';
import getTrimmedTxHash from '../utils/getTrimmedTxHash';
import Blocks from '../components/Blocks';

const BlocksPage: React.FC<{}> = () => {
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
    <div className="bg-white dark:bg-loopring-dark-background rounded p-4">
      <h1 className="text-3xl mb-2 font-bold">Latest Blocks</h1>
      <Blocks />
    </div>
  );
};

export default BlocksPage;
