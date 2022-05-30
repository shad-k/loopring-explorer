import React from 'react';

import Transactions from '../components/Transactions';

const TransactionsPage: React.FC<{}> = () => {
  return (
    <div className={`bg-white dark:bg-loopring-dark-background rounded p-4`}>
      <Transactions />
    </div>
  );
};

export default TransactionsPage;
