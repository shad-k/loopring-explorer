import React from "react";

const TableCell: React.FC<
  React.PropsWithChildren<{ align?: "left" | "right" | "center" }>
> = ({ children, align = "left" }) => {
  return (
    <td
      className={`p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap text-${align}`}
    >
      {children}
    </td>
  );
};

export default TableCell;
