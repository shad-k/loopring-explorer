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
  token0USDPrice: number;
  token0: string;
}> = ({ transactions, pageChangeHandler, page, token0USDPrice, token0 }) => {
  return (
    <>
      <table className="table-auto w-full border-collapse border table-fixed">
        <thead className="text-left text-center border border-loopring-blue bg-loopring-blue text-white">
          <tr>
            <th className="p-2">From</th>
            <th>To</th>
            <th>Amounts</th>
            <th>Total Amount</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody className="text-center">
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
              console.log(token0, tokenA.symbol, tokenB.symbol);
              return (
                <tr className="border" key={id}>
                  <td className="p-2">
                    <AppLink path="account" accountId={accountA.id}>
                      {getTrimmedTxHash(accountA.address)}
                    </AppLink>
                  </td>
                  <td>
                    <AppLink path="account" accountId={accountB.id}>
                      {getTrimmedTxHash(accountB.address)}
                    </AppLink>
                  </td>
                  <td>
                    {tokenAAmount > 1 ? tokenAAmount.toFixed(2) : tokenAAmount}{" "}
                    {tokenA.symbol} &harr;{" "}
                    {tokenBAmount > 1 ? tokenBAmount.toFixed(2) : tokenBAmount}{" "}
                    {tokenB.symbol}{" "}
                  </td>
                  <td>
                    $
                    {(token0 === tokenA.symbol
                      ? tokenAAmount * token0USDPrice
                      : tokenBAmount * token0USDPrice
                    ).toFixed(2)}
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
