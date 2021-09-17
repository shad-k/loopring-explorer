import React from "react";
import { useRouter } from "next/router";
import request from "graphql-request";

import useTransactions, { FETCH_TXS } from "../hooks/useTransactions";

import TableLoader from "../components/TableLoader";
import Pagination from "../components/Pagination";
import AppLink from "../components/AppLink";
import getDateString from "../utils/getDateString";
import { LOOPRING_SUBGRAPH } from "../utils/config";
import TransactionTableDetails, {
  getCSVTransactionDetailFields,
} from "../components/transactionDetail/TransactionTableDetails";
import getTimeFromNow from "../utils/getTimeFromNow";

const Transactions: React.FC<{
  blockIDFilter?: string;
  accountIdFilter?: Array<string>;
  transactionCounts?: { [index: string]: number };
}> = ({ blockIDFilter, accountIdFilter, transactionCounts }) => {
  const router = useRouter();
  const [currentPage, setPage] = React.useState<number>(1);
  const [blockId, setBlockId] = React.useState(
    router.query.block || blockIDFilter
  );

  const [txType, setTxType] = React.useState(
    (router.query.type as string) || "all"
  );
  const [showDownloadModal, setShowDownloadModal] =
    React.useState<boolean>(false);
  const [showDownloadButton, setShowDownloadButton] =
    React.useState<boolean>(false);

  const ENTRIES_PER_PAGE = accountIdFilter || blockIDFilter ? 10 : 25;
  const { data, error, isLoading } = useTransactions(
    (currentPage - 1) * ENTRIES_PER_PAGE,
    ENTRIES_PER_PAGE,
    "internalID",
    "desc",
    blockId,
    txType === "all" ? null : txType,
    accountIdFilter
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
    if (router.query && router.query.block) {
      setBlockId(router.query.block);
    } else if (!blockIDFilter) {
      setBlockId(undefined);
    }
    if (router.query && router.query.type) {
      setTxType(router.query.type as string);
    }
  }, [router.query]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const { block, txType: txTypeInput } = event.currentTarget;

    if (block) {
      if (block.value !== "") {
        router.push(
          {
            pathname: router.pathname,
            query: { ...router.query, block: block.value },
          },
          undefined,
          {
            shallow: true,
          }
        );
      } else {
        const { block, ...restQuery } = router.query;
        router.push(
          { pathname: router.pathname, query: { ...restQuery, page: 1 } },
          undefined,
          {
            shallow: true,
          }
        );
      }
    }

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

  const makeCSV = async (transactions) => {
    const csv = ["Tx ID,Type,From,To,Amount,Fee,Verified At"];
    transactions.forEach((tx) => {
      csv.push(
        [
          tx.id,
          tx.__typename,
          ...getCSVTransactionDetailFields(tx),
          getDateString(tx.block.timestamp),
        ].join(",")
      );
    });

    const csvFile = new Blob([csv.join("\n")], { type: "text/csv" });

    // Download link
    const downloadLink = document.getElementById(
      "csv-download"
    ) as HTMLAnchorElement;

    // File name
    downloadLink.download = "transactions";

    // We have to create a link to the file
    downloadLink.href = URL.createObjectURL(csvFile);
  };

  const getAllTransactions = async (page: number) => {
    const txs = await request(LOOPRING_SUBGRAPH, FETCH_TXS, {
      skip: page * 20,
      first: 20,
      orderBy: "internalID",
      orderDirection: "desc",
      where: {
        accounts: accountIdFilter,
      },
    });

    if (txs.transactions.length > 0) {
      const nextTxs = await getAllTransactions(page + 1);
      return [...txs.transactions, ...nextTxs];
    }

    return [...txs.transactions];
  };

  const downloadCSV = async () => {
    setShowDownloadModal(true);
    if (data.transactions && data.transactions.lenght < 10) {
      await makeCSV(data.transactions);
      setShowDownloadButton(true);
    } else {
      const allTxs = await getAllTransactions(0);

      await makeCSV(allTxs);
      setShowDownloadButton(true);
    }
  };

  const getTransactionType = (type) => {
    switch (type) {
      case "Add":
        return "Amm Join";
      case "Remove":
        return "Amm Exit";
      case "OrderbookTrade":
        return "Trade";
      default:
        return type;
    }
  };

  const getTotalTransactionCount = (type, proxy) => {
    if (!proxy) {
      return null;
    }

    switch (type) {
      case "all":
        return proxy.transactionCount;
      case "Deposit":
        return proxy.depositCount;
      case "Withdrawal":
        return proxy.withdrawalCount;
      case "Transfer":
        return proxy.transferCount;
      case "Add":
        return proxy.addCount;
      case "Remove":
        return proxy.removeCount;
      case "OrderbookTrade":
        return proxy.orderbookTradeCount;
      case "Swap":
        return proxy.swapCount;
      case "AccountUpdate":
        return proxy.accountUpdateCount;
      case "AmmUpdate":
        return proxy.ammUpdateCount;
      case "SignatureVerification":
        return proxy.signatureVerificationCount;
      default:
        return null;
    }
  };

  let blockTransactionCounts;
  if (blockId && data && data.transactions.length > 0) {
    const {
      transactionCount,
      depositCount,
      withdrawalCount,
      transferCount,
      addCount,
      removeCount,
      orderbookTradeCount,
      swapCount,
      accountUpdateCount,
      ammUpdateCount,
      signatureVerificationCount,
    } = data.transactions[0].block;
    blockTransactionCounts = {
      transactionCount,
      depositCount,
      withdrawalCount,
      transferCount,
      addCount,
      removeCount,
      orderbookTradeCount,
      swapCount,
      accountUpdateCount,
      ammUpdateCount,
      signatureVerificationCount,
    };
  }

  return (
    <div
      className={`bg-white shadow-custom rounded ${
        !accountIdFilter ? "p-4" : "pt-8 pb-4"
      } min-h-table`}
    >
      {blockIDFilter ? (
        <h2 className="text-2xl">Transactions in block #{blockIDFilter}</h2>
      ) : accountIdFilter ? (
        <h2 className="text-2xl">Transactions in account #{accountIdFilter}</h2>
      ) : (
        <h1 className="text-3xl mb-5">Latest Transactions</h1>
      )}
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
          <option value="Swap" selected={txType === "Swap"}>
            Swap
          </option>
          <option value="OrderbookTrade" selected={txType === "OrderbookTrade"}>
            Trade
          </option>
          <option value="Add" selected={txType === "Add"}>
            Amm Join
          </option>
          <option value="Remove" selected={txType === "Remove"}>
            Amm Exit
          </option>
          <option value="Transfer" selected={txType === "Transfer"}>
            Transfer
          </option>
          <option value="Deposit" selected={txType === "Deposit"}>
            Deposit
          </option>
          <option value="Withdrawal" selected={txType === "Withdrawal"}>
            Withdrawal
          </option>
          <option value="AccountUpdate" selected={txType === "AccountUpdate"}>
            AccountUpdate
          </option>
          <option value="AmmUpdate" selected={txType === "AmmUpdate"}>
            AmmUpdate
          </option>
          <option
            value="SignatureVerification"
            selected={txType === "SignatureVerification"}
          >
            SignatureVerification
          </option>
        </select>
        {!blockIDFilter && !accountIdFilter && (
          <input
            type="text"
            className="h-9 rounded-sm px-1 border w-full lg:w-1/5 mb-2 lg:mb-0"
            placeholder="Filter by block"
            name="block"
            defaultValue={blockId}
          />
        )}
        <button
          type="submit"
          className="bg-loopring-darkBlue px-6 ml-2 rounded text-white h-9"
        >
          Filter
        </button>
      </form>
      <div className="w-full overflow-auto">
        <table className="table-auto w-full border-collapse border">
          <thead className="border border-loopring-blue bg-loopring-blue text-white">
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
                  <tr className="border" key={tx.id}>
                    <td className="p-2 whitespace-nowrap">
                      <AppLink path="transaction" tx={tx.id}>
                        {tx.id}
                      </AppLink>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      {getTransactionType(tx.__typename)}
                    </td>
                    <TransactionTableDetails
                      tx={tx}
                      type={tx.__typename}
                      cellClassName="p-2 whitespace-nowrap"
                    />
                    <td className="p-2 whitespace-nowrap">
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
        {accountIdFilter ? (
          <button
            className="bg-loopring-darkBlue px-6 mt-2 rounded text-white h-9 text-sm order-2 lg:order-none"
            onClick={downloadCSV}
          >
            Download as CSV
          </button>
        ) : (
          <span />
        )}
        <Pagination
          currentPage={currentPage}
          onPageChange={pageChangeHandler}
          total={
            accountIdFilter
              ? null
              : getTotalTransactionCount(
                  txType,
                  blockId
                    ? blockTransactionCounts
                    : blockIDFilter
                    ? transactionCounts
                    : data && data.proxy
                )
          }
          entriesPerPage={ENTRIES_PER_PAGE}
        />
      </div>
      {showDownloadModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 flex justify-center items-center">
          <div className="bg-white w-1/3 p-6 rounded flex flex-col justify-between items-center relative">
            <div
              onClick={() => setShowDownloadModal(false)}
              className="absolute right-4 top-1 text-2xl cursor-pointer"
            >
              &times;
            </div>
            <h4 className="text-2xl text-black text-center">
              {showDownloadButton
                ? "Your CSV is ready"
                : "Please wait while we get your CSV ready"}
            </h4>
            <a
              id="csv-download"
              className={`bg-loopring-darkBlue px-6 mt-2 rounded text-white h-9 text-sm flex justify-center items-center ${
                !showDownloadButton ? "bg-opacity-25" : ""
              }`}
              onClick={() => setShowDownloadModal(false)}
            >
              Download
              {showDownloadButton ? null : (
                <div className="ml-2 animate-spin border-l border-white rounded-full w-4 h-4"></div>
              )}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
