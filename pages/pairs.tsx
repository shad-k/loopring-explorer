import React from 'react';

import Pairs from '../components/Pairs';

const PairsPage: React.FC<{}> = () => {
  return (
    <div className="bg-white dark:bg-loopring-dark-background rounded p-4 min-h-table">
      <h1 className="text-3xl mb-2 font-bold">Pairs</h1>
      <Pairs />
    </div>
  );
};

export default PairsPage;
