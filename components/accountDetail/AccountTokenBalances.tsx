import React from "react";

import getTokenAmount from "../../utils/getTokenAmount";
import Pagination from "../../components/Pagination";
import { useAccountTokenBalancesQuery } from "../../generated/loopringExplorer";
import CursorPagination from "../CursorPagination";
import useTokens from "../../hooks/useTokens";

interface Props {
  accountId: string;
}

const AccountTokenBalances: React.FC<Props> = ({ accountId }) => {
  const TOTAL_COUNT = 10;
  const [afterCursor, setAfterCursor] = React.useState<string>();
  const [beforeCursor, setBeforeCursor] = React.useState<string>();
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  const { data: tokensData, isLoading } = useTokens();

  const { data, fetchMore, error, loading } = useAccountTokenBalancesQuery({
    variables: {
      where: {
        account: accountId,
      },
    },
  });

  const fetchNextBalances = async () => {
    if (!hasMore) {
      return;
    }

    await fetchMore({
      variables: {
        where: {
          account: accountId,
          id_gt: afterCursor,
        },
      },
    });
  };

  const fetchPreviousBalances = async () => {
    await fetchMore({
      variables: {
        where: {
          account: accountId,
          id_lt: beforeCursor,
        },
      },
    });
  };

  React.useEffect(() => {
    if (data && data.accountTokenBalances) {
      const firstTokenBalance = data.accountTokenBalances[0];
      const lastTokenBalance =
        data.accountTokenBalances[data.accountTokenBalances.length - 1];
      setAfterCursor(lastTokenBalance.id);
      setBeforeCursor(firstTokenBalance.id);
      setHasMore(!(data.accountTokenBalances.length < TOTAL_COUNT));
    }
  }, [data]);

  if (loading || isLoading) {
    return null;
  }

  if (error) {
    return (
      <div className="text-gray-400 text-2xl h-40 flex items-center justify-center w-full border">
        Couldn't fetch token balances
      </div>
    );
  }

  const accountTokenBalancesWithSymbol = data.accountTokenBalances
    .filter(({ balance }) => balance > 0)
    .map((accountTokenBalance) => {
      const { token } = accountTokenBalance;
      if (token.name && token.symbol) {
        return accountTokenBalance;
      } else {
        const fullTokenData = tokensData.find(
          ({ tokenId }) => parseInt(token.id) === tokenId
        );
        if (fullTokenData) {
          return {
            ...accountTokenBalance,
            token: {
              ...accountTokenBalance.token,
              name: fullTokenData.name,
              symbol: fullTokenData.symbol,
              decimals: fullTokenData.decimals,
            },
          };
        } else {
          return null;
        }
      }
    });

  return (
    <div>
      {accountTokenBalancesWithSymbol.length === 0 ? (
        <div className="text-gray-400 text-2xl h-40 flex items-center justify-center w-full border">
          No token balances to show
        </div>
      ) : (
        <>
          <table className="w-full table-auto table-fixed">
            <thead className="text-center bg-loopring-blue border border-loopring-blue dark:border-loopring-dark-darkBlue dark:bg-loopring-dark-darkBlue text-white">
              <tr>
                <th className="p-2">Token</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {accountTokenBalancesWithSymbol.map(
                (accountTokenBalance, index) => {
                  if (!accountTokenBalance) {
                    return null;
                  }
                  const { id, balance, token } = accountTokenBalance;
                  return (
                    <tr
                      key={id}
                      className="border rounded dark:border-loopring-dark-background"
                    >
                      <td className="p-2 border-b dark:border-loopring-dark-darkBlue dark:text-white">
                        {token.name}
                      </td>
                      <td className="border-b dark:border-loopring-dark-darkBlue dark:text-white">
                        {getTokenAmount(balance, token.decimals)} {token.symbol}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          <CursorPagination
            onNextClick={fetchNextBalances}
            onPreviousClick={fetchPreviousBalances}
            hasMore={hasMore}
          />
        </>
      )}
    </div>
  );
};

export default AccountTokenBalances;
