import React from "react";

import getTokenAmount from "../../utils/getTokenAmount";
import Pagination from "../../components/Pagination";

interface Props {
  balances: Array<any>;
}

const AccountTokenBalances: React.FC<Props> = ({ balances }) => {
  const TOTAL_COUNT = 10;
  const [balancePage, setBalancePage] = React.useState<number>(1);

  const pageStart = (balancePage - 1) * TOTAL_COUNT;
  const pageEnd = balancePage * TOTAL_COUNT;

  const filteredBalances = balances.filter(
    ({ token, balance }) => !((!token.name && !token.symbol) || balance == 0)
  );

  return (
    <div>
      {filteredBalances.length === 0 ? (
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
        </>
      )}
    </div>
  );
};

export default AccountTokenBalances;
