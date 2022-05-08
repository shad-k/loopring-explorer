import React from 'react';
import { HiOutlineArrowRight as Right, HiOutlineArrowLeft as Left } from 'react-icons/hi';

interface CursorPaginationProps {
  onNextClick: () => void;
  onPreviousClick: () => void;
  hasMore: boolean;
}

const CursorPagination: React.FC<CursorPaginationProps> = ({ onNextClick, onPreviousClick, hasMore }) => {
  const [page, setPage] = React.useState<number>(1);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const next = async () => {
    setPage((val) => val + 1);
    setIsLoading(true);
    await onNextClick();
    setIsLoading(false);
  };

  const previous = () => {
    setPage((val) => val - 1);
    onPreviousClick();
  };

  return (
    <div className="text-white flex items-center justify-center p-4">
      <button onClick={previous} disabled={page === 1 || isLoading}>
        <Left size={25} color={page === 1 ? '#656567' : 'white'} />
      </button>
      <div className="mx-4">Page {page}</div>
      <button onClick={next} disabled={!hasMore || isLoading}>
        {' '}
        <Right size={25} color={!hasMore ? '#656567' : 'white'} />
      </button>
    </div>
  );
};

export default CursorPagination;
