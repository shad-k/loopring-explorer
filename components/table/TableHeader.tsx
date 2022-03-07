import React from "react";

const TableHeader: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <thead className="bg-loopring-blue border border-loopring-blue dark:border-loopring-dark-darkBlue dark:bg-loopring-dark-darkBlue text-white">
      <tr>{children}</tr>
    </thead>
  );
};

export default TableHeader;
