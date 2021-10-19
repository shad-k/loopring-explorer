import React from "react";
import { useRouter } from "next/router";

import usePairs from "../hooks/usePairs";

import TableLoader from "../components/TableLoader";
import Pagination from "../components/Pagination";
import AppLink from "../components/AppLink";

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
        <table className="table-auto w-full border-collapse">
          <thead className="bg-loopring-blue border border-loopring-blue dark:border-loopring-dark-darkBlue dark:bg-loopring-dark-darkBlue text-white text-center">
            <tr>
              <th className="p-2 whitespace-nowrap">Pair ID</th>
              <th className="p-2 whitespace-nowrap">Token A</th>
              <th className="p-2 whitespace-nowrap">Token B</th>
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
                    <td className="p-2 border-b dark:border-loopring-dark-darkBlue  whitespace-nowrap">
                      <AppLink path="pair" pair={pair.id}>
                        {pair.id}
                      </AppLink>
                    </td>
                    <td className="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap">
                      {pair.token0.symbol}
                    </td>
                    <td className="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap">
                      {pair.token1.symbol}
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
