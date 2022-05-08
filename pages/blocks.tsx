import React from 'react';

import Blocks from '../components/Blocks';

const BlocksPage: React.FC<{}> = () => {
  return (
    <div className="bg-white dark:bg-loopring-dark-background rounded p-4">
      <h1 className="text-3xl mb-2 font-bold">Latest Blocks</h1>
      <Blocks />
    </div>
  );
};

export default BlocksPage;
