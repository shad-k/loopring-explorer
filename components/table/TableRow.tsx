import React from "react";

const TableRow: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <tr className="border dark:border-loopring-dark-background ml-2">
      {children}
    </tr>
  );
};

export default TableRow;
