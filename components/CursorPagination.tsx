import React from "react";
import {
  HiOutlineArrowRight as Right,
  HiOutlineArrowLeft as Left,
} from "react-icons/hi";

interface CursorPaginationProps {
  onNextClick: () => void;
  onPreviousClick: () => void;
  hasMore: boolean;
}

const CursorPagination: React.FC<CursorPaginationProps> = ({
  onNextClick,
  onPreviousClick,
  hasMore,
}) => {
  const [page, setPage] = React.useState<number>(1);

  const next = () => {
    setPage((val) => val + 1);
    onNextClick();
  };

  const previous = () => {
    setPage((val) => val - 1);
    onPreviousClick();
  };

  return (
    <div className="text-white flex items-center justify-center p-4">
      <button onClick={previous} disabled={page === 1}>
        <Left size={25} color={page === 1 ? "#656567" : "white"} />
      </button>
      <div className="mx-4">Page {page}</div>
      <button onClick={next} disabled={!hasMore}>
        {" "}
        <Right size={25} color={!hasMore ? "#656567" : "white"} />
      </button>
    </div>
  );
};

export default CursorPagination;
