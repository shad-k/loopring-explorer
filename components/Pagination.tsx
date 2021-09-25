import React from "react";

interface Props {
  currentPage: number;
  onPageChange: (page: number) => void;
  total?: number;
  entriesPerPage?: number;
}

const PaginationButton: React.FC<
  React.PropsWithChildren<{
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    isActive?: boolean;
  }>
> = ({ children, onClick, disabled, className = "", isActive }) => {
  if (disabled) {
    return null;
  }
  return (
    <button
      className={`border-l border-r dark:border-loopring-dark-darkBlue ${
        isActive
          ? "text-white dark:text-loopring-dark-background bg-loopring-darkBlue dark:bg-loopring-dark-gray"
          : "text-loopring-blue dark:bg-loopring-dark-background dark:text-white"
      } p-2 flex flex-1 items-center justify-center ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={{ minWidth: "48px" }}
    >
      {children}
    </button>
  );
};

const Pagination: React.FC<Props> = ({
  currentPage,
  onPageChange,
  total,
  entriesPerPage = 10,
}) => {
  const [pageButtons, setPageButtons] = React.useState([1, 2, 3, 4]);
  const [totalPages, setTotalPages] = React.useState<number>();
  const [prevTotal, setPrevTotal] = React.useState(total);

  React.useEffect(() => {
    if (currentPage === totalPages && totalPages > 4) {
      setPageButtons([
        currentPage - 3,
        currentPage - 2,
        currentPage - 1,
        currentPage,
      ]);
    } else if (currentPage > 4) {
      setPageButtons([currentPage - 1, currentPage, currentPage + 1]);
    } else if (totalPages && totalPages < 4) {
      const buttons = [];
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
      setPageButtons(buttons);
    } else {
      setPageButtons([1, 2, 3, 4]);
    }
  }, [currentPage, totalPages]);

  React.useEffect(() => {
    if ((total && !totalPages) || (total && total !== prevTotal)) {
      setTotalPages(Math.ceil(total / entriesPerPage));
      setPrevTotal(total);
    }
  }, [total]);

  if (total == 0) {
    return null;
  }

  return (
    <div className="flex h-10 mt-2 justify-end w-full lg:w-auto">
      <div className="flex bg-white items-center rounded border dark:border-loopring-dark-darkBlue w-full lg:w-auto overflow-hidden">
        <PaginationButton
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          «
        </PaginationButton>
        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹
        </PaginationButton>
        {currentPage > 4 && (
          <PaginationButton
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ...
          </PaginationButton>
        )}
        {pageButtons.map((page) => {
          return (
            <PaginationButton
              onClick={() => onPageChange(page)}
              key={page}
              isActive={currentPage === page}
            >
              {page}
            </PaginationButton>
          );
        })}
        {((currentPage < totalPages - 4 && totalPages > 4) || !totalPages) && (
          <PaginationButton>...</PaginationButton>
        )}
        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </PaginationButton>
        {!!totalPages && (
          <PaginationButton
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            »
          </PaginationButton>
        )}
      </div>
    </div>
  );
};

export default Pagination;
