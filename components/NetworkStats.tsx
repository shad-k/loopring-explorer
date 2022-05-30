import React from 'react';
import numeral from 'numeral';

import getTimeFromNow from '../utils/getTimeFromNow';

const NetworkStats: React.FC<{ networkStats: any }> = ({ networkStats }) => {
  let avgBlockDetails = React.useMemo(() => {
    if (networkStats && networkStats.blocks.length > 0) {
      let avgTransactionCount = 0;
      let blockTime = Date.now();
      let avgTimeBetweenBlocks = 0;
      networkStats.blocks.forEach((block) => {
        avgTransactionCount += parseInt(block.transactionCount);
        avgTimeBetweenBlocks += blockTime - block.timestamp * 1000;
        blockTime = block.timestamp * 1000;
      });
      return {
        transactionCount: avgTransactionCount / networkStats.blocks.length,
        timeBetweenBlocks: `${Math.floor(avgTimeBetweenBlocks / (networkStats.blocks.length * 1000 * 60))} mins`,
      };
    }
    return {
      transactionCount: null,
      timeBetweenBlocks: null,
    };
  }, [networkStats]);

  if (!networkStats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-16">
      <div className="flex flex-col px-8 py-4 rounded-xl pb-10 border-2 border-loopring-blue dark:border-loopring-dark-gray text-loopring-lightBlue dark:text-white items-center justify-center h-32">
        <span className=" mb-4">Total Transactions</span>
        <span className="text-3xl flex-1">{numeral(networkStats.proxy.transactionCount).format('0,0')}</span>
      </div>
      <div className="flex flex-col px-8 py-2 rounded-xl pb-10 border-2 border-loopring-blue dark:border-loopring-dark-gray text-loopring-lightBlue dark:text-white items-center justify-center h-32">
        <span className=" mb-4">Total Blocks</span>
        <span className="text-3xl flex-1">{numeral(networkStats.proxy.blockCount).format('0,0')}</span>
      </div>
      <div className="flex flex-col px-8 py-2 rounded-xl pb-10 border-2 border-loopring-blue dark:border-loopring-dark-gray text-loopring-lightBlue dark:text-white items-center justify-center h-32">
        <span className=" mb-4">Total L2 Accounts</span>
        <span className="text-3xl flex-1">{networkStats && numeral(networkStats.proxy.userCount).format('0,0')}</span>
      </div>
      <div className="flex flex-col px-8 py-2 rounded-xl pb-10 border-2 border-loopring-blue dark:border-loopring-dark-gray text-loopring-lightBlue dark:text-white items-center justify-center h-32">
        <span className=" mb-4">Avg. Block Time</span>
        <span className="text-3xl flex-1">{avgBlockDetails.timeBetweenBlocks}</span>
      </div>
      <div className="flex flex-col px-8 py-2 rounded-xl pb-10 border-2 border-loopring-blue dark:border-loopring-dark-gray text-loopring-lightBlue dark:text-white items-center justify-center h-32">
        <span className=" mb-4">Avg. Txs per Block</span>
        <span className="text-3xl flex-1">
          {avgBlockDetails.transactionCount && numeral(avgBlockDetails.transactionCount).format('0,0')}
        </span>
      </div>
      <div className="flex flex-col px-8 py-2 rounded-xl pb-10 border-2 border-loopring-blue dark:border-loopring-dark-gray text-loopring-lightBlue dark:text-white items-center justify-center h-32">
        <span className=" mb-4">Last Block Submitted</span>
        <span className="text-3xl flex-1">{networkStats && getTimeFromNow(networkStats.blocks[0].timestamp)}</span>
      </div>
    </div>
  );
};

export default NetworkStats;
