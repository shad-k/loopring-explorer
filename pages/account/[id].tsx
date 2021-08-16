import React from "react";
import { useRouter } from "next/router";

import useAccount from "../../hooks/useAccount";
import AppLink from "../../components/AppLink";

import getDateString from "../../utils/getDateString";
import getTokenAmount from "../../utils/getTokenAmount";

const Account: React.FC<{}> = () => {
  const router = useRouter();
  const accountId = router.query.id;
  const { data, error, isLoading } = useAccount(accountId);

  const { address, createdAtTransaction, balances, __typename } =
    (data && data.account) || {};

  return (
    <div className="bg-white shadow-custom rounded p-4 min-h-table">
      <h1 className="text-3xl mb-5">Account #{accountId}</h1>
      <div className="border rounded w-full mb-10">
        {data && data.account && (
          <table className="w-full table-auto table-fixed">
            <tbody>
              <tr className="border">
                <td className="p-2 w-1/5">Address</td>
                <td>
                  <AppLink path="account" accountId={address} isExplorerLink>
                    {address}
                  </AppLink>
                </td>
              </tr>
              <tr className="border">
                <td className="p-2 w-1/5">Account Type</td>
                <td>{__typename}</td>
              </tr>
              <tr className="border">
                <td className="p-2 w-1/5">Created at</td>
                <td>
                  Tx{" "}
                  <AppLink path="transaction" tx={createdAtTransaction.id}>
                    #
                    <span className="font-bold">{createdAtTransaction.id}</span>
                  </AppLink>
                  &nbsp;at {getDateString(createdAtTransaction.block.timestamp)}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      {data && !isLoading && !data.account && (
        <div className="text-gray-400 text-2xl h-40 flex items-center justify-center w-full border">
          No transaction found
        </div>
      )}
      {balances && balances.length > 0 && (
        <div>
          <h3 className="text-xl mb-5">Token Balances</h3>
          <table className="w-full table-auto table-fixed border">
            <thead className="text-left">
              <tr>
                <th className="p-2">Token</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {balances.map((accountTokenBalance) => {
                const { id, balance, token } = accountTokenBalance;
                if ((!token.name && !token.symbol) || balance == 0) {
                  return null;
                }
                return (
                  <tr key={id} className="border rounded">
                    <td className="p-2">
                      {token.name} ({token.symbol})
                    </td>
                    <td>{getTokenAmount(balance, token.decimals)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Account;
