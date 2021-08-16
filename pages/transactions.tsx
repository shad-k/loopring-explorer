import React from "react";
import { useRouter } from "next/router";

import useTransactions from "../hooks/useTransactions";

import TableLoader from "../components/TableLoader";
import Pagination from "../components/Pagination";
import AppLink from "../components/AppLink";
import getDateString from "../utils/getDateString";

const Transactions: React.FC<{
  blockIDFilter?: string;
  accountIdFilter?: Array<string>;
}> = ({ blockIDFilter, accountIdFilter }) => {
  const router = useRouter();
  const [currentPage, setPage] = React.useState<number>(1);
  const [blockId, setBlockId] = React.useState(
    router.query.block || blockIDFilter
  );
  const [txType, setTxType] = React.useState(
    (router.query.type as string) || "all"
  );

  const { data, error, isLoading } = useTransactions(
    (currentPage - 1) * 10,
    10,
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
        className="my-2 flex justify-end items-center"
        onSubmit={submitHandler}
      >
        <select
          className="h-9 rounded-sm px-2 border w-1/5 mr-2"
          name="txType"
          defaultValue={txType}
        >
          <option value="all">All Transactions</option>
          <option value="Swap">Swap</option>
          <option value="OrderbookTrade">OrderbookTrade</option>
          <option value="Add">Add</option>
          <option value="Remove">Remove</option>
          <option value="Transfer">Transfer</option>
          <option value="Deposit">Deposit</option>
          <option value="Withdrawal">Withdrawal</option>
          <option value="AccountUpdate">AccountUpdate</option>
          <option value="AmmUpdate">AmmUpdate</option>
          <option value="SignatureVerification">SignatureVerification</option>
        </select>
        {!blockIDFilter && !accountIdFilter && (
          <input
            type="text"
            className="h-9 rounded-sm px-1 border w-1/5"
            placeholder="Filter by block"
            name="block"
          />
        )}
        <button
          type="submit"
          className="bg-loopring-darkBlue px-6 ml-2 rounded text-white h-9"
        >
          Filter
        </button>
      </form>
      <table className="table-auto w-full border-collapse border table-fixed">
        <thead className="text-left border">
          <tr>
            <th className="p-1">Transaction ID</th>
            <th>Block ID</th>
            <th>Submitted At</th>
            <th>Tx Type</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.transactions.map((tx) => {
              return (
                <tr className="border" key={tx.id}>
                  <td className="p-1">
                    <AppLink path="transaction" tx={tx.id}>
                      {tx.id}
                    </AppLink>
                  </td>
                  <td>
                    <AppLink path="block" block={tx.block.id}>
                      {tx.block.id}
                    </AppLink>
                  </td>
                  <td>{getDateString(tx.block.timestamp)}</td>
                  <td>{tx.__typename}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {data && data.transactions.length === 0 && (
        <div className="text-gray-400 text-2xl h-40 flex items-center justify-center w-full border">
          No transactions to show
        </div>
      )}
      {isLoading && <TableLoader />}
      {error && (
        <div className="h-40 flex items-center justify-center text-red-400 text-xl">
          Couldn't fetch transactions
        </div>
      )}
      <Pagination currentPage={currentPage} onPageChange={pageChangeHandler} />
    </div>
  );
};

export default Transactions;
