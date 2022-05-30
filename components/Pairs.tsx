import React from 'react';
import numeral from 'numeral';

import TableLoader from '../components/TableLoader';
import AppLink from '../components/AppLink';
import USDPriceValue from '../components/USDPriceValue';

import stableCoins from '../utils/stableCoins';
import getTokenAmount from '../utils/getTokenAmount';
import getTokenIcon from '../utils/getTokenIcon';
import { OrderDirection, usePairsQuery } from '../generated/loopringExplorer';
import CursorPagination from './CursorPagination';

interface PairsProps {
  pairsCount?: number;
  isPaginated?: boolean;
}

const Pairs: React.FC<PairsProps> = ({ pairsCount = 10, isPaginated = true }) => {
  const TOTAL_COUNT = pairsCount;
  const { data, error, loading, fetchMore } = usePairsQuery({
    variables: {
      first: TOTAL_COUNT,
      orderDirection: OrderDirection.Desc,
    },
    fetchPolicy: 'network-only',
  });

  return (
    <div className="bg-white dark:bg-loopring-dark-background rounded min-h-table">
      <div className="w-full overflow-auto">
        <table className="table-fixed w-full border-collapse">
          <thead className="bg-loopring-blue border border-loopring-blue dark:border-loopring-dark-darkBlue dark:bg-loopring-dark-darkBlue text-white">
            <tr>
              <th className="p-2 whitespace-nowrap w-28">Pair</th>
              <th className="p-2 pl-36 whitespace-nowrap w-64">Volume 24H</th>
              <th className="p-2 whitespace-nowrap w-64">Volume 7D</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data &&
              data.pairs.map((pair) => {
                return (
                  <tr key={pair.id} className="border dark:border-loopring-dark-background ml-2">
                    <td className="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap dark:text-white">
                      <AppLink path="pair" pair={pair.id}>
                        <div className="flex items-center px-4 lg:p-0">
                          <img
                            src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${getTokenIcon(
                              pair.token1.address,
                              pair.token1.symbol
                            )}/logo.png`}
                            className="token-icon"
                          />
                          <img
                            src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${getTokenIcon(
                              pair.token0.address,
                              pair.token0.symbol
                            )}/logo.png`}
                            className="token-icon"
                          />
                          <span className="ml-2 w-16">
                            {pair.token0.symbol}/{pair.token1.symbol}
                          </span>
                        </div>
                      </AppLink>
                    </td>

                    <td className="p-2 pl-36 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap dark:text-white">
                      {stableCoins.includes(pair.token0.symbol) ? (
                        numeral(
                          getTokenAmount(pair?.dailyEntities[0]?.tradedVolumeToken0Swap, pair.token0.decimals)
                        ).format('$0.0a')
                      ) : stableCoins.includes(pair.token1.symbol) ? (
                        numeral(
                          getTokenAmount(pair?.dailyEntities[0]?.tradedVolumeToken1Swap, pair.token1.decimals)
                        ).format('$0.0a')
                      ) : (
                        <USDPriceValue
                          token0={pair.token0}
                          value0={getTokenAmount(pair?.dailyEntities[0]?.tradedVolumeToken0Swap, pair.token0.decimals)}
                          token1={pair.token1}
                          value1={getTokenAmount(pair?.dailyEntities[0]?.tradedVolumeToken1Swap, pair.token1.decimals)}
                        />
                      )}
                    </td>
                    <td className="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap dark:text-white">
                      {stableCoins.includes(pair.token0.symbol) ? (
                        numeral(
                          getTokenAmount(pair?.weeklyEntities[0]?.tradedVolumeToken0Swap, pair.token0.decimals)
                        ).format('$0.0a')
                      ) : stableCoins.includes(pair.token1.symbol) ? (
                        numeral(
                          getTokenAmount(pair?.weeklyEntities[0]?.tradedVolumeToken1Swap, pair.token1.decimals)
                        ).format('$0.0a')
                      ) : (
                        <USDPriceValue
                          token0={pair.token0}
                          value0={getTokenAmount(pair?.weeklyEntities[0]?.tradedVolumeToken0Swap, pair.token0.decimals)}
                          token1={pair.token1}
                          value1={getTokenAmount(pair?.weeklyEntities[0]?.tradedVolumeToken1Swap, pair.token1.decimals)}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {data && data.pairs && data.pairs.length === 0 && (
        <div className="text-gray-400 dark:text-white text-2xl h-40 flex items-center justify-center w-full border">
          No pairs to show
        </div>
      )}
      {loading && <TableLoader />}
      {error && <div className="h-40 flex items-center justify-center text-red-400 text-xl">Couldn't fetch pairs</div>}
      {isPaginated && (
        <CursorPagination
          onNextClick={(fetchNext, afterCursor) =>
            fetchNext({
              variables: {
                where: {
                  tradedVolumeToken0Swap_lt: afterCursor,
                },
              },
            })
          }
          onPreviousClick={(fetchPrevious, beforeCursor) =>
            fetchPrevious({
              variables: {
                where: {
                  tradedVolumeToken0Swap_gt: beforeCursor,
                },
                orderDirection: OrderDirection.Asc,
              },
              updateQuery(_, data) {
                return {
                  pairs: data.fetchMoreResult.pairs.reverse(),
                };
              },
            })
          }
          data={data}
          dataKey="pairs"
          totalCount={TOTAL_COUNT}
          fetchMore={fetchMore}
          orderBy="tradedVolumeToken0Swap"
        />
      )}
    </div>
  );
};

export default Pairs;
