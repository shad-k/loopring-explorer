import React from "react";
import { useRouter } from "next/router";

import useAccounts from "../../hooks/useAccounts";
import AppLink from "../../components/AppLink";
import Transactions from "../transactions";

import getDateString from "../../utils/getDateString";
import getTokenAmount from "../../utils/getTokenAmount";
import Pagination from "../../components/Pagination";
import getTrimmedTxHash from "../../utils/getTrimmedTxHash";

const Account: React.FC<{}> = () => {
  const router = useRouter();
  const accountId = router.query.id;
  const { data, error, isLoading } = useAccounts(accountId);

  const TOTAL_COUNT = 10;

  const [balancePage, setBalancePage] = React.useState<number>(1);

  const { address, createdAtTransaction, balances, __typename, id } =
    (data && data.accounts.length > 0 && data.accounts[0]) || {};
  const pageStart = (balancePage - 1) * TOTAL_COUNT;
  const pageEnd = balancePage * TOTAL_COUNT;

  const filteredBalances = React.useMemo(() => {
    if (balances && balances.length > 0) {
      return balances.filter(
        ({ token, balance }) =>
          !((!token.name && !token.symbol) || balance == 0)
      );
    }
    return null;
  }, [data, balances]);
  return (
    <div className="bg-white dark:bg-loopring-dark-background rounded p-4 min-h-table">
      <h1 className="text-3xl mb-5">Account #{accountId}</h1>
      <div className="border dark:border-loopring-dark-darkBlue rounded w-full mb-10 overflow-auto">
        {data && data.accounts.length > 0 && (
          <table className="w-full table-auto table-fixed">
            <tbody>
              <tr className="border dark:border-loopring-dark-darkBlue">
                <td className="p-2 lg:w-1/5 whitespace-nowrap">L1 Address</td>
                <td>
                  <AppLink
                    path="account"
                    accountId={address}
                    isExplorerLink
                    address={address}
                  >
                    <span className="flex items-center break-all">
                      <span className="hidden lg:block">{address}</span>
                      <span className="lg:hidden">
                        {getTrimmedTxHash(address, 7)}
                      </span>
                    </span>
                  </AppLink>
                </td>
              </tr>
              <tr className="border dark:border-loopring-dark-darkBlue">
                <td className="p-2 w-1/5">Account Type</td>
                <td>{__typename}</td>
              </tr>
              <tr className="border dark:border-loopring-dark-darkBlue">
                <td className="p-2 w-1/5">Created at</td>
                <td>
                  Tx{" "}
                  <AppLink path="transaction" tx={createdAtTransaction.id}>
                    <span className="font-bold dark:text-white">
                      #{createdAtTransaction.id}
                    </span>
                  </AppLink>
                  &nbsp;at {getDateString(createdAtTransaction.block.timestamp)}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      {data && !isLoading && data.accounts.length === 0 && (
        <div className="text-gray-400 dark:text-white text-2xl h-40 flex items-center justify-center w-full border">
          No transaction found
        </div>
      )}
      {filteredBalances && filteredBalances.length > 0 && (
        <div>
          <h3 className="text-xl mb-5">Token Balances</h3>
          <table className="w-full table-auto table-fixed">
            <thead className="text-center bg-loopring-blue border border-loopring-blue dark:border-loopring-dark-darkBlue dark:bg-loopring-dark-darkBlue text-white">
              <tr>
                <th className="p-2">Token</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {filteredBalances.map((accountTokenBalance, index) => {
                if (index >= pageStart && index < pageEnd) {
                  const { id, balance, token } = accountTokenBalance;
                  return (
                    <tr
                      key={id}
                      className="border rounded dark:border-loopring-dark-background"
                    >
                      <td className="p-2 border-b dark:border-loopring-dark-darkBlue dark:text-white">
                        {token.name} ({token.symbol})
                      </td>
                      <td className="border-b dark:border-loopring-dark-darkBlue dark:text-white">
                        {getTokenAmount(balance, token.decimals)}
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
          <Pagination
            currentPage={balancePage}
            onPageChange={(page) => setBalancePage(page)}
            total={filteredBalances.length}
            entriesPerPage={10}
          />
        </div>
      )}
      {data && data.accounts.length > 0 && (
        <Transactions
          accountIdFilter={[
            (accountId as string).startsWith("0x") ? id : accountId,
          ]}
        />
      )}
    </div>
  );
};

export default Account;
