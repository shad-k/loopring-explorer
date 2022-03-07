import React from "react";

const Table: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <table className="table-auto w-full">{children}</table>;
};

export default Table;
