import React from "react";
import { useRouter } from "next/router";

import useAccounts from "../../hooks/useAccounts";
import AppLink from "../../components/AppLink";
import Transactions from "../transactions";

import getDateString from "../../utils/getDateString";
import getTrimmedTxHash from "../../utils/getTrimmedTxHash";
import AccountTokenBalances from "../../components/accountDetail/AccountTokenBalances";
import TabbedView from "../../components/TabbedView";
import AccountNFTs from "../../components/accountDetail/AccountNFTs";

const Account: React.FC<{}> = () => {
  const router = useRouter();
  const [accountId, setAccountId] = React.useState(router.query.id);
  const { data, error, isLoading } = useAccounts(accountId);

  const { address, createdAtTransaction, balances, slots, __typename, id } =
    (data && data.accounts.length > 0 && data.accounts[0]) || {};

  React.useEffect(() => {
    setAccountId(router.query.id);
  }, [router.query]);

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
      <TabbedView
        key={accountId as string}
        tabs={[
          {
            title: "Token Balances",
            view: balances ? (
              <AccountTokenBalances balances={balances} />
            ) : null,
          },
          {
            title: "NFTs",
            view: slots ? <AccountNFTs slots={slots} /> : null,
          },
        ]}
      />
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
