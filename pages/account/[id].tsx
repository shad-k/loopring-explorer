import React from 'react';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';

import AppLink from '../../components/AppLink';
import Transactions from '../../components/Transactions';

import getDateString from '../../utils/getDateString';
import getTrimmedTxHash from '../../utils/getTrimmedTxHash';
import AccountTokenBalances from '../../components/accountDetail/AccountTokenBalances';
import TabbedView from '../../components/TabbedView';
import AccountNFTs from '../../components/accountDetail/AccountNFTs';
import client from '../../graphql';
import { FETCH_ACCOUNTS } from '../../graphql/queries/account';
import { AccountsQueryResult } from '../../generated/loopringExplorer';

interface AccountPageProps {
  accounts: AccountsQueryResult['data']['accounts'];
}

type WhereFilter = {
  address?: string;
  id?: string;
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.params;

  const whereFilter: WhereFilter = {};
  if ((id as string).startsWith('0x')) {
    whereFilter.address = (id as string).toLowerCase();
  } else {
    whereFilter.id = id as string;
  }

  try {
    const { data } = await client.query({
      query: FETCH_ACCOUNTS,
      variables: {
        where: whereFilter,
        first: 1,
      },
    });

    return {
      props: {
        accounts: data.accounts,
      },
    };
  } catch (error) {
    return {
      props: {
        accounts: null,
      },
    };
  }
};

const Account: React.FC<AccountPageProps> = ({ accounts }) => {
  if (!accounts) {
    return null;
  }

  if (accounts.length === 0) {
    return (
      <div className="text-gray-400 dark:text-white text-2xl h-40 flex items-center justify-center w-full border">
        No account found
      </div>
    );
  }

  const { address, createdAtTransaction, __typename, id: accountId } = (accounts.length > 0 && accounts[0]) || {};

  return (
    <div className="bg-white dark:bg-loopring-dark-background rounded p-4 min-h-table">
      <h1 className="text-3xl mb-5">Account #{accountId}</h1>
      <div className="border dark:border-loopring-dark-darkBlue rounded w-full mb-10 overflow-auto">
        {accounts.length > 0 && (
          <table className="w-full table-auto table-fixed">
            <tbody>
              <tr className="border dark:border-loopring-dark-darkBlue">
                <td className="p-2 lg:w-1/5 whitespace-nowrap">L1 Address</td>
                <td>
                  <AppLink path="account" accountId={address} isExplorerLink address={address}>
                    <span className="flex items-center break-all">
                      <span className="hidden lg:block">{address}</span>
                      <span className="lg:hidden">{getTrimmedTxHash(address, 7)}</span>
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
                  Tx{' '}
                  <AppLink path="transaction" tx={createdAtTransaction.id}>
                    <span className="font-bold dark:text-white">#{createdAtTransaction.id}</span>
                  </AppLink>
                  &nbsp;at {getDateString(createdAtTransaction.block.timestamp)}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <TabbedView
        key={accountId as string}
        tabs={[
          {
            title: 'Token Balances',
            view: <AccountTokenBalances accountId={accountId} />,
          },
          {
            title: 'NFTs',
            view: <AccountNFTs accountId={accountId} />,
          },
        ]}
      />
      {accounts.length > 0 && (
        <div className="pt-8 pb-4">
          <Transactions
            accountIdFilter={[accountId]}
            title={<h2 className="text-2xl font-semibold">Transactions in account #{accountId}</h2>}
          />
        </div>
      )}
    </div>
  );
};

export default Account;
