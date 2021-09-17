import React from "react";

const TableLoader: React.FC<{ rows?: number; columns?: number }> = ({
  rows = 10,
  columns = 5,
}) => {
  const rowsContent = [];
  const columnsContent = [];
  for (let i = 0; i < columns; i++) {
    columnsContent.push(
      <div key={i} className="h-4 bg-gray-300 rounded flex-1 mx-2" />
    );
  }
  for (let i = 0; i < rows; i++) {
    rowsContent.push(
      <div key={i} className="flex w-full justify-between mb-4">
        {columnsContent}
      </div>
    );
  }
  return (
    <div className="animate-pulse flex flex-col w-full border justify-between py-2 flex-wrap mb-40">
      {rowsContent}
    </div>
  );
};

export default TableLoader;
