import React from "react";

const NoTransactionFound: React.FC<{}> = () => {
  return (
    <div className="text-gray-400 dark:text-white text-2xl h-48 flex items-center justify-center w-full border">
      <div className="flex flex-col items-center">
        No transaction found
        <ol className="text-base mt-4">
          <li>
            1) If you have just submitted a transaction please wait for at least
            30 seconds before refreshing this page.
          </li>
          <li>
            2) It could still be pending submission to L1 Ethereum, waiting to
            be broadcasted. This can take awhile.
          </li>
          <li>
            3) When Ethereum is congested it can take a while for your
            transaction to be posted onchain.
          </li>
          <li>
            4) If it still does not show up after 1 hour, please check your
            wallet on loopring.io
          </li>
        </ol>
      </div>
    </div>
  );
};

export default NoTransactionFound;
