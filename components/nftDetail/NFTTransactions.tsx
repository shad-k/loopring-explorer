import React from "react";
import { useRouter } from "next/router";

import useNFTTransactions from "../../hooks/useNFTTransactions";

import TableLoader from "../../components/TableLoader";
import Pagination from "../../components/Pagination";
import AppLink from "../../components/AppLink";
import TransactionTableDetails from "../../components/transactionDetail/TransactionTableDetails";
import getTimeFromNow from "../../utils/getTimeFromNow";

const NFTTransactions: React.FC<{}> = () => {
  const router = useRouter();
  const [currentPage, setPage] = React.useState<number>(1);

  const [txType, setTxType] = React.useState(
    (router.query.type as string) || "all"
  );

  const ENTRIES_PER_PAGE = 10;
  const { data, error, isLoading } = useNFTTransactions(
    (currentPage - 1) * ENTRIES_PER_PAGE,
    ENTRIES_PER_PAGE,
    "internalID",
    "desc",
    txType === "all" ? null : txType
  );

  const pageChangeHandler = (page) => {
    router.push(
      { pathname: router.pathname, query: { ...router.query, page } },
      undefined,
      {
        shallow: true,
      }
    );
  };

  React.useEffect(() => {
    if (router.query && router.query.page) {
      setPage(parseInt(router.query.page as string));
    }
    if (router.query && router.query.type) {
      setTxType(router.query.type as string);
    }
  }, [router.query]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const { txType: txTypeInput } = event.currentTarget;

    if (txTypeInput && txTypeInput.value !== txType) {
      // if used on the block detail page
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, type: txTypeInput.value, page: 1 },
        },
        undefined,
        {
          shallow: true,
        }
      );
    }
  };

  return (
    <div
      className={`bg-white dark:bg-loopring-dark-background rounded p-4 min-h-table`}
    >
      <h2 className="text-2xl">Trading History</h2>
      <form
        className="my-2 flex flex-col lg:flex-row justify-end items-end lg:items-center"
        onSubmit={submitHandler}
      >
        <select
          className="h-9 rounded-sm px-2 border w-full lg:w-1/5 mb-2 lg:mb-0 lg:mr-2"
          name="txType"
        >
          <option value="all" selected={txType === "all"}>
            All Transactions
          </option>
          <option value="SwapNFT" selected={txType === "SwapNFT"}>
            SwapNFT
          </option>
          <option value="TradeNFT" selected={txType === "TradeNFT"}>
            TradeNFT
          </option>
          <option value="TransferNFT" selected={txType === "TransferNFT"}>
            TransferNFT
          </option>
          <option value="MintNFT" selected={txType === "MintNFT"}>
            MintNFT
          </option>
          <option value="WithdrawalNFT" selected={txType === "WithdrawalNFT"}>
            WithdrawalNFT
          </option>
          <option value="DataNFT" selected={txType === "DataNFT"}>
            DataNFT
          </option>
        </select>
        <button
          type="submit"
          className="bg-loopring-darkBlue dark:bg-loopring-dark-blue px-6 ml-2 rounded text-white h-9"
        >
          Filter
        </button>
      </form>
      <div className="w-full overflow-auto">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-loopring-blue border border-loopring-blue dark:border-loopring-dark-darkBlue dark:bg-loopring-dark-darkBlue text-white">
            <tr>
              <th className="p-2 whitespace-nowrap">Tx ID</th>
              <th className="p-2 whitespace-nowrap">Type</th>
              <th className="p-2 whitespace-nowrap">From</th>
              <th className="p-2 whitespace-nowrap">To</th>
              <th className="p-2 whitespace-nowrap">Amount</th>
              <th className="p-2 whitespace-nowrap">Fee</th>
              <th className="p-2 whitespace-nowrap">Verified</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data &&
              data.transactions.map((tx) => {
                return (
                  <tr
                    className="border dark:border-loopring-dark-background"
                    key={tx.id}
                  >
                    <td className="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap dark:text-white">
                      <AppLink path="transaction" tx={tx.id}>
                        {tx.id}
                      </AppLink>
                    </td>
                    <td className="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap dark:text-white">
                      {tx.__typename}
                    </td>
                    <TransactionTableDetails
                      tx={tx}
                      type={tx.__typename}
                      cellClassName="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap dark:text-white"
                    />
                    <td className="p-2 border-b dark:border-loopring-dark-darkBlue whitespace-nowrap dark:text-white">
                      {getTimeFromNow(tx.block.timestamp)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {data && data.transactions.length === 0 && (
        <div className="text-gray-400 text-2xl h-40 flex items-center justify-center w-full border">
          No transactions to show
        </div>
      )}
      {isLoading && <TableLoader rows={ENTRIES_PER_PAGE} columns={6} />}
      {error && (
        <div className="h-40 flex items-center justify-center text-red-400 text-xl">
          Couldn't fetch transactions
        </div>
      )}
      <div className="flex flex-col lg:flex-row justify-between w-full">
        <Pagination
          currentPage={currentPage}
          onPageChange={pageChangeHandler}
          total={null}
          entriesPerPage={ENTRIES_PER_PAGE}
        />
      </div>
    </div>
  );
};

export default NFTTransactions;
