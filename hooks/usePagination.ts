import { QueryResult } from '@apollo/client';
import React from 'react';

const usePagination = (data, dataKey, fetchMore: QueryResult['fetchMore'], totalCount = 10, orderBy = 'id') => {
  const [afterCursor, setAfterCursor] = React.useState<string>();
  const [beforeCursor, setBeforeCursor] = React.useState<string>();
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  const fetchNext = async (options) => {
    if (!hasMore) {
      return;
    }

    await fetchMore(options);
  };

  const fetchPrevious = async (options) => {
    await fetchMore(options);
  };

  React.useEffect(() => {
    if (data && data[dataKey]) {
      const first = data[dataKey][0];
      const last = data[dataKey][data[dataKey].length - 1];
      if (first) {
        setBeforeCursor(first[orderBy]);
      }
      if (last) {
        setAfterCursor(last[orderBy]);
      }
      setHasMore(!(data[dataKey].length < totalCount));
    }
  }, [data]);

  return {
    afterCursor,
    beforeCursor,
    fetchNext,
    fetchPrevious,
    hasMore,
  };
};

export default usePagination;
