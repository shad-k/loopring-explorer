import React from "react";

import AppLink from "../AppLink";
import Pagination from "../Pagination";
import getTokenAmount from "../../utils/getTokenAmount";
import getTrimmedTxHash from "../../utils/getTrimmedTxHash";
import getTimeFromNow from "../../utils/getTimeFromNow";

const Swaps: React.FC<{
  transactions: Array<any>;
  pageChangeHandler: (page: number) => void;
  page: number;
}> = ({ transactions, pageChangeHandler, page }) => {
  return (
    <>
      <table className="table-auto w-full border-collapse border table-fixed">
        <thead className="text-left border">
          <tr>
            <th></th>
            <th className="p-1">Amounts</th>
            <th>Account</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 &&
            transactions.map((tx) => {
              const { id, tokenA, tokenB, fillSA, fillSB, account, block } = tx;

              const tokenAAmount = getTokenAmount(fillSA, tokenA.decimals);
              const tokenBAmount = getTokenAmount(fillSB, tokenB.decimals);
              return (
                <tr className="border" key={id}>
                  <td className="p-1">
                    <AppLink path="transaction" tx={id}>
                      Swap {tokenA.symbol} for {tokenB.symbol}
                    </AppLink>
                  </td>
                  <td>
                    {tokenAAmount > 1 ? tokenAAmount.toFixed(2) : tokenAAmount}{" "}
                    {tokenA.symbol} &harr;{" "}
                    {tokenBAmount > 1 ? tokenBAmount.toFixed(2) : tokenBAmount}{" "}
                    {tokenB.symbol}{" "}
                  </td>
                  <td>
                    <AppLink
                      path="account"
                      accountId={account.address}
                      isExplorerLink
                    >
                      {getTrimmedTxHash(account.address, 10, true)}
                    </AppLink>
                    &nbsp; (
                    <AppLink path="account" accountId={account.id}>
                      {account.id}
                    </AppLink>
                    )
                  </td>
                  <td>{getTimeFromNow(block.timestamp)} ago</td>
                  {/* <td>{getDateString(tx.block.timestamp)}</td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
      <Pagination currentPage={page} onPageChange={pageChangeHandler} />
    </>
  );
};

export default Swaps;
