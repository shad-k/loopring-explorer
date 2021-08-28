import React from "react";

import AppLink from "../AppLink";
import Pagination from "../Pagination";
import getTokenAmount from "../../utils/getTokenAmount";
import getTrimmedTxHash from "../../utils/getTrimmedTxHash";
import getTimeFromNow from "../../utils/getTimeFromNow";

const Trades: React.FC<{
  transactions: Array<any>;
  pageChangeHandler: (page: number) => void;
  page: number;
}> = ({ transactions, pageChangeHandler, page }) => {
  return (
    <>
      <table className="table-auto w-full border-collapse border table-fixed">
        <thead className="text-left border">
          <tr>
            <th className="p-1">From</th>
            <th>To</th>
            <th>Amounts</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 &&
            transactions.map((tx) => {
              const {
                id,
                block,
                accountA,
                accountB,
                tokenA,
                tokenB,
                data,
                fillSA,
                fillSB,
              } = tx;

              const tokenAAmount = getTokenAmount(fillSA, tokenA.decimals);
              const tokenBAmount = getTokenAmount(fillSB, tokenB.decimals);
              return (
                <tr className="border" key={id}>
                  <td className="p-1">
                    <AppLink
                      path="account"
                      accountId={accountA.address}
                      isExplorerLink
                    >
                      {getTrimmedTxHash(accountA.address, 10, true)}
                    </AppLink>
                    &nbsp; (
                    <AppLink path="account" accountId={accountA.id}>
                      {accountA.id}
                    </AppLink>
                    )
                  </td>
                  <td>
                    <AppLink
                      path="account"
                      accountId={accountB.address}
                      isExplorerLink
                    >
                      {getTrimmedTxHash(accountB.address, 10, true)}
                    </AppLink>
                    &nbsp; (
                    <AppLink path="account" accountId={accountB.id}>
                      {accountB.id}
                    </AppLink>
                    )
                  </td>
                  <td>
                    {tokenAAmount > 1 ? tokenAAmount.toFixed(2) : tokenAAmount}{" "}
                    {tokenA.symbol} &harr;{" "}
                    {tokenBAmount > 1 ? tokenBAmount.toFixed(2) : tokenBAmount}{" "}
                    {tokenB.symbol}{" "}
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

export default Trades;
