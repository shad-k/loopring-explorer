import React from "react";

const TableBody: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <tbody className="text-center">{children}</tbody>;
};

export default TableBody;
