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
  token0USDPrice: number;
}> = ({ transactions, pageChangeHandler, page, token0USDPrice }) => {
  return (
    <>
      <div className="w-full overflow-auto">
        <table className="table-auto w-full border-collapse border">
          <thead className="text-left text-center border border-loopring-blue bg-loopring-blue text-white">
            <tr>
              <th></th>
              <th className="p-2 whitespace-nowrap">Amounts</th>
              <th className="p-2 whitespace-nowrap">Total Amount</th>
              <th className="p-2 whitespace-nowrap">Account</th>
              <th className="p-2 whitespace-nowrap">Time</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {transactions.length > 0 &&
              transactions.map((tx) => {
                const { id, tokenA, tokenB, fillSA, fillSB, account, block } =
                  tx;

                const tokenAAmount = getTokenAmount(fillSA, tokenA.decimals);
                const tokenBAmount = getTokenAmount(fillSB, tokenB.decimals);
                return (
                  <tr className="border" key={id}>
                    <td className="p-2 whitespace-nowrap">
                      <AppLink path="transaction" tx={id}>
                        Swap {tokenA.symbol} for {tokenB.symbol}
                      </AppLink>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      {tokenAAmount > 1
                        ? tokenAAmount.toFixed(2)
                        : tokenAAmount}{" "}
                      {tokenA.symbol} &harr;{" "}
                      {tokenBAmount > 1
                        ? tokenBAmount.toFixed(2)
                        : tokenBAmount}{" "}
                      {tokenB.symbol}{" "}
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      ${(tokenAAmount * token0USDPrice).toFixed(2)}
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <AppLink path="account" accountId={account.id}>
                        {getTrimmedTxHash(account.address, 10, true)}
                      </AppLink>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      {getTimeFromNow(block.timestamp)}
                    </td>
                    {/* <td>{getDateString(tx.block.timestamp)}</td> */}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {transactions && transactions.length === 0 && (
        <div className="text-gray-400 text-2xl h-40 flex items-center justify-center w-full border">
          No transactions to show
        </div>
      )}
      <Pagination currentPage={page} onPageChange={pageChangeHandler} />
    </>
  );
};

export default Swaps;
