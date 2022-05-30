import { QueryResult } from '@apollo/client';
import React from 'react';
import { HiOutlineArrowRight as Right, HiOutlineArrowLeft as Left } from 'react-icons/hi';
import { AiOutlineLoading3Quarters as Loader } from 'react-icons/ai';
import usePagination from '../hooks/usePagination';

interface CursorPaginationProps {
  onNextClick: (fetchNext, afterCursor) => void;
  onPreviousClick: (fetchPrevious, beforeCursor) => void;
  data: QueryResult['data'];
  dataKey: string;
  fetchMore: QueryResult['fetchMore'];
  totalCount?: number;
  orderBy?: string;
}

const CursorPagination: React.FC<CursorPaginationProps> = ({
  onNextClick,
  onPreviousClick,
  data,
  dataKey,
  fetchMore,
  totalCount = 25,
  orderBy,
}) => {
  const [page, setPage] = React.useState<number>(1);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [previousLoading, setPreviousLoading] = React.useState<boolean>(false);
  const [nextLoading, setNextLoading] = React.useState<boolean>(false);
  const { afterCursor, beforeCursor, fetchNext, fetchPrevious, hasMore } = usePagination(
    data,
    dataKey,
    fetchMore,
    totalCount,
    orderBy
  );

  const next = async () => {
    setPage((val) => val + 1);
    setIsLoading(true);
    setNextLoading(true);
    await onNextClick(fetchNext, afterCursor);
    setIsLoading(false);
    setNextLoading(false);
  };

  const previous = async () => {
    setPage((val) => val - 1);
    setIsLoading(true);
    setPreviousLoading(true);
    await onPreviousClick(fetchPrevious, beforeCursor);
    setIsLoading(false);
    setPreviousLoading(false);
  };

  return (
    <div className="text-white flex items-center justify-center p-4">
      {previousLoading ? (
        <Loader className="animate-spin" size={25} />
      ) : (
        <button onClick={previous} disabled={page === 1 || isLoading}>
          <Left size={25} color={page === 1 ? '#656567' : 'white'} />
        </button>
      )}
      <div className="mx-4">Page {page}</div>
      {nextLoading ? (
        <Loader className="animate-spin" size={25} />
      ) : (
        <button onClick={next} disabled={!hasMore || isLoading}>
          {' '}
          <Right size={25} color={!hasMore ? '#656567' : 'white'} />
        </button>
      )}
    </div>
  );
};

export default CursorPagination;
