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
  return (
    <button
      className={`border-l border-r ${
        isActive ? "text-white bg-indigo-700" : "text-indigo-900"
      } py-2 w-12 flex items-center justify-center ${className}`}
      onClick={onClick}
      disabled={disabled}
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
  const totalPages = React.useMemo(() => {
    return Math.ceil(total / entriesPerPage);
  }, []);

  React.useEffect(() => {
    if (currentPage === totalPages) {
      setPageButtons([
        currentPage - 3,
        currentPage - 2,
        currentPage - 1,
        currentPage,
      ]);
    } else if (currentPage > 4) {
      setPageButtons([currentPage - 1, currentPage, currentPage + 1]);
    } else {
      setPageButtons([1, 2, 3, 4]);
    }
  }, [currentPage]);

  return (
    <div className="flex h-10 mt-2 justify-end">
      <div className="flex bg-white items-center rounded border">
        <PaginationButton onClick={() => onPageChange(1)}>«</PaginationButton>
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
        {(currentPage < totalPages || !totalPages) && (
          <PaginationButton>...</PaginationButton>
        )}
        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </PaginationButton>
        {!!totalPages && (
          <PaginationButton onClick={() => onPageChange(totalPages)}>
            »
          </PaginationButton>
        )}
      </div>
    </div>
  );
};

export default Pagination;
