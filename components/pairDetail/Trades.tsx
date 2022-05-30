import React from 'react';

import AppLink from '../AppLink';
import getTokenAmount from '../../utils/getTokenAmount';
import getTrimmedTxHash from '../../utils/getTrimmedTxHash';
import getTimeFromNow from '../../utils/getTimeFromNow';
import { OrderDirection, usePairTradesQuery } from '../../generated/loopringExplorer';
import CursorPagination from '../CursorPagination';

const Trades: React.FC<{
  pairId: string;
  token0USDPrice: number;
  token0: string;
}> = ({ pairId, token0USDPrice, token0 }) => {
  const { data, error, loading, fetchMore } = usePairTradesQuery({
    variables: {
      orderDirection: OrderDirection.Desc,
      where: {
        pair: pairId,
      },
    },
  });

  return (
    <>
      <div className="w-full overflow-auto">
        <table className="table-auto w-full border-collapse">
          <thead className="text-left text-center border border-loopring-blue dark:border-loopring-dark-darkBlue bg-loopring-blue dark:bg-loopring-dark-darkBlue text-white">
            <tr>
              <th className="p-2 whitespace-nowrap">From</th>
              <th className="p-2 whitespace-nowrap">To</th>
              <th className="p-2 whitespace-nowrap">Amounts</th>
              <th className="p-2 whitespace-nowrap">Total Amount</th>
              <th className="p-2 whitespace-nowrap">Time</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data &&
              data.orderbookTrades.length > 0 &&
              data.orderbookTrades.map((tx) => {
                const { id, block, accountA, accountB, tokenA, tokenB, fillSA, fillSB } = tx;

                const tokenAAmount = getTokenAmount(fillSA, tokenA.decimals);
                const tokenBAmount = getTokenAmount(fillSB, tokenB.decimals);
                return (
                  <tr className="border dark:border-loopring-dark-background" key={id}>
                    <td className="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap">
                      <AppLink path="account" accountId={accountA.id}>
                        {getTrimmedTxHash(accountA.address, 10, true)}
                      </AppLink>
                    </td>
                    <td className="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap">
                      <AppLink path="account" accountId={accountB.id}>
                        {getTrimmedTxHash(accountB.address, 10, true)}
                      </AppLink>
                    </td>
                    <td className="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap dark:text-white">
                      {tokenAAmount > 1 ? tokenAAmount.toFixed(2) : tokenAAmount} {tokenA.symbol} &harr;{' '}
                      {tokenBAmount > 1 ? tokenBAmount.toFixed(2) : tokenBAmount} {tokenB.symbol}{' '}
                    </td>
                    <td className="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap dark:text-white">
                      $
                      {(token0 === tokenA.symbol
                        ? tokenAAmount * token0USDPrice
                        : tokenBAmount * token0USDPrice
                      ).toFixed(2)}
                    </td>
                    <td className="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap dark:text-white">
                      {getTimeFromNow(block.timestamp)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {data && data.orderbookTrades && data.orderbookTrades.length === 0 && !loading && (
        <div className="text-gray-400 text-2xl h-40 flex items-center justify-center w-full border">
          No transactions to show
        </div>
      )}
      <CursorPagination
        onNextClick={(fetchNext, afterCursor) =>
          fetchNext({
            variables: {
              where: {
                pair: pairId,
                internalID_lt: afterCursor,
              },
            },
          })
        }
        onPreviousClick={(fetchPrevious, beforeCursor) =>
          fetchPrevious({
            variables: {
              where: {
                pair: pairId,
                internalID_gt: beforeCursor,
              },
              orderDirection: OrderDirection.Asc,
            },
            updateQuery(_, data) {
              return {
                orderbookTrades: data.fetchMoreResult.orderbookTrades.reverse(),
              };
            },
          })
        }
        data={data}
        dataKey="orderbookTrades"
        fetchMore={fetchMore}
        totalCount={10}
        orderBy="internalID"
      />
    </>
  );
};

export default Trades;
