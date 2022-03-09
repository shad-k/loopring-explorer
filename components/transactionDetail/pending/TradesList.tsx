import React from "react";

import PendingTradeOrSwap from "./PendingTradeOrSwap";

const TradesList: React.FC<{ trades: Array<any>; txId: string }> = ({
  trades,
}) => {
  return (
    <div className="bg-white dark:bg-loopring-dark-background rounded p-4">
      <table className="w-full table-auto table-fixed">
        <thead className="bg-loopring-blue border border-loopring-blue dark:border-loopring-dark-darkBlue dark:bg-loopring-dark-darkBlue text-white">
          <tr>
            <th className="p-2 whitespace-nowrap">Side</th>
            <th className="p-2 whitespace-nowrap">Market</th>
            <th className="p-2 whitespace-nowrap">Status</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => {
            const accountId = trade[9];
            const tokenId = trade[10];
            const storageId = trade[11];
            const size = trade[3];

            return (
              <PendingTradeOrSwap
                trade={trade}
                key={`${accountId}-${tokenId}-${storageId}-${size}`}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TradesList;
