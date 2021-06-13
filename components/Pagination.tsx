import React from "react";

interface Props {
  currentPage: number;
  onPageChange: (page: number) => void;
  total?: number;
  entriesPerPage?: number;
}

const PaginationButton: React.FC<
  React.PropsWithChildren<{ onClick?: () => void }>
> = ({ children, onClick }) => {
  return (
    <div
      className="border-l border-r text-indigo-900 px-3 py-1 flex items-center"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const Pagination: React.FC<Props> = ({
  currentPage,
  onPageChange,
  total,
  entriesPerPage = 10,
}) => {
  const pageButtons = [1, 2, 3, 4];
  const totalPages = Math.ceil(total / entriesPerPage);

  return (
    <div className="flex h-8 mt-2 justify-end">
      <div className="flex bg-white items-center rounded border">
        <PaginationButton onClick={() => onPageChange(1)}>«</PaginationButton>
        <PaginationButton onClick={() => onPageChange(currentPage - 1)}>
          ‹
        </PaginationButton>
        {pageButtons.map((page) => {
          if (page <= totalPages) {
            return (
              <PaginationButton onClick={() => onPageChange(page)} key={page}>
                {page}
              </PaginationButton>
            );
          }
        })}
        <PaginationButton>...</PaginationButton>
        <PaginationButton onClick={() => onPageChange(currentPage + 1)}>
          ›
        </PaginationButton>
        <PaginationButton onClick={() => onPageChange(totalPages)}>
          »
        </PaginationButton>
      </div>
    </div>
  );
};

export default Pagination;
