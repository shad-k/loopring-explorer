import React from "react";
import PendingNFTTrade from "./PendingNFTTrade";

import PendingTradeOrSwap from "./PendingTradeOrSwap";

const NFTTradesList: React.FC<{ trades: Array<any>; txId: string }> = ({
  trades,
}) => {
  return (
    <div className="bg-white dark:bg-loopring-dark-background rounded p-4">
      <table className="w-full table-auto table-fixed">
        <thead className="bg-loopring-blue border border-loopring-blue dark:border-loopring-dark-darkBlue dark:bg-loopring-dark-darkBlue text-white">
          <tr>
            <th className="p-2 whitespace-nowrap">Hash</th>
            <th className="p-2 whitespace-nowrap">Price</th>
            <th className="p-2 whitespace-nowrap">Status</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => {
            const accountId = trade[13];
            const tokenId = trade[7];
            const storageId = trade[16];
            console.log(accountId, tokenId, storageId);

            return (
              <PendingNFTTrade
                trade={trade}
                key={`${accountId}-${tokenId}-${storageId}`}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default NFTTradesList;
