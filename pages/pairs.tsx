import React from "react";
import { useRouter } from "next/router";
import numeral from "numeral";

import usePairs from "../hooks/usePairs";

import TableLoader from "../components/TableLoader";
import Pagination from "../components/Pagination";
import AppLink from "../components/AppLink";
import USDPriceValue from "../components/USDPriceValue";

import stableCoins from "../utils/stableCoins";
import getTokenAmount from "../utils/getTokenAmount";
import getTokenIcon from "../utils/getTokenIcon";

const Pairs: React.FC<{}> = () => {
  const router = useRouter();
  const [currentPage, setPage] = React.useState<number>(1);
  const { data, error, isLoading } = usePairs((currentPage - 1) * 10, 10);

  const pageChangeHandler = (page) => {
    router.push({ pathname: router.pathname, query: { page } }, undefined, {
      shallow: true,
    });
  };

  React.useEffect(() => {
    if (router.query && router.query.page) {
      setPage(parseInt(router.query.page as string));
    }
  }, [router.query]);

  return (
    <div className="bg-white dark:bg-loopring-dark-background rounded p-4 min-h-table">
      <h1 className="text-3xl mb-2 font-bold">Pairs</h1>
      <div className="w-full overflow-auto">
        <table className="table-fixed w-full border-collapse">
          <thead className="bg-loopring-blue border border-loopring-blue dark:border-loopring-dark-darkBlue dark:bg-loopring-dark-darkBlue text-white">
            <tr>
              <th className="p-2 whitespace-nowrap  w-56">Pair</th>
              <th className="p-2 whitespace-nowrap">24hr Volume (USD)</th>
              <th className="p-2 whitespace-nowrap">1w Volume (USD)</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data &&
              data.pairs.map((pair) => {
                return (
                  <tr
                    key={pair.id}
                    className="border dark:border-loopring-dark-background ml-2"
                  >
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

                    <td className="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap dark:text-white">
                      {stableCoins.includes(pair.token0.symbol) ? (
                        numeral(
                          getTokenAmount(
                            pair?.dailyEntities[0]?.tradedVolumeToken0Swap,
                            pair.token0.decimals
                          )
                        ).format("$0.0a")
                      ) : stableCoins.includes(pair.token1.symbol) ? (
                        numeral(
                          getTokenAmount(
                            pair?.dailyEntities[0]?.tradedVolumeToken1Swap,
                            pair.token1.decimals
                          )
                        ).format("$0.0a")
                      ) : (
                        <USDPriceValue
                          token0={pair.token0}
                          value0={getTokenAmount(
                            pair?.dailyEntities[0]?.tradedVolumeToken0Swap,
                            pair.token0.decimals
                          )}
                          token1={pair.token1}
                          value1={getTokenAmount(
                            pair?.dailyEntities[0]?.tradedVolumeToken1Swap,
                            pair.token1.decimals
                          )}
                        />
                      )}
                    </td>
                    <td className="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap dark:text-white">
                      {stableCoins.includes(pair.token0.symbol) ? (
                        numeral(
                          getTokenAmount(
                            pair?.weeklyEntities[0]?.tradedVolumeToken0Swap,
                            pair.token0.decimals
                          )
                        ).format("$0.0a")
                      ) : stableCoins.includes(pair.token1.symbol) ? (
                        numeral(
                          getTokenAmount(
                            pair?.weeklyEntities[0]?.tradedVolumeToken1Swap,
                            pair.token1.decimals
                          )
                        ).format("$0.0a")
                      ) : (
                        <USDPriceValue
                          token0={pair.token0}
                          value0={getTokenAmount(
                            pair?.weeklyEntities[0]?.tradedVolumeToken0Swap,
                            pair.token0.decimals
                          )}
                          token1={pair.token1}
                          value1={getTokenAmount(
                            pair?.weeklyEntities[0]?.tradedVolumeToken1Swap,
                            pair.token1.decimals
                          )}
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
      {isLoading && <TableLoader />}
      {error && (
        <div className="h-40 flex items-center justify-center text-red-400 text-xl">
          Couldn't fetch pairs
        </div>
      )}
      <Pagination currentPage={currentPage} onPageChange={pageChangeHandler} />
    </div>
  );
};

export default Pairs;
