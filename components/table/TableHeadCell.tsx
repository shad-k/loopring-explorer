import React from "react";

const TableHeadCell: React.FC<
  React.PropsWithChildren<{ align?: "left" | "right" | "center" }>
> = ({ children, align = "left" }) => {
  return <th className={`p-2 whitespace-nowrap text-${align}`}>{children}</th>;
};

export default TableHeadCell;
