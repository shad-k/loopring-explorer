import React from "react";

const TableLoader: React.FC<{}> = () => {
  return (
    <div className="animate-pulse flex flex-col h-32 w-full border justify-between p-2 flex-wrap mb-40">
      <div className="flex w-full space-x-4">
        <div className="h-4 bg-gray-300 rounded w-1/6" />
        <div className="h-4 bg-gray-300 rounded w-1/6" />
        <div className="h-4 bg-gray-300 rounded w-2/6" />
        <div className="h-4 bg-gray-300 rounded w-2/6" />
      </div>
      <div className="flex w-full space-x-4">
        <div className="h-4 bg-gray-300 rounded w-1/6" />
        <div className="h-4 bg-gray-300 rounded w-1/6" />
        <div className="h-4 bg-gray-300 rounded w-2/6" />
        <div className="h-4 bg-gray-300 rounded w-2/6" />
      </div>
      <div className="flex w-full space-x-4">
        <div className="h-4 bg-gray-300 rounded w-1/6" />
        <div className="h-4 bg-gray-300 rounded w-1/6" />
        <div className="h-4 bg-gray-300 rounded w-2/6" />
        <div className="h-4 bg-gray-300 rounded w-2/6" />
      </div>
    </div>
  );
};

export default TableLoader;
