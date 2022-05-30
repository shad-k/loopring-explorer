import React from 'react';
import { useBlockQuery, useTransactionQuery } from '../generated/loopringExplorer';
import useAccounts from './useAccounts';

const useSearch = (query: string) => {
  const { data: blockData, loading: blockIsLoading } = useBlockQuery({
    variables: {
      id: query,
    },
  });
  const { data: txData, loading: txIsLoading } = useTransactionQuery({
    variables: {
      id: query,
    },
  });
  const { data: accountData, isLoading: accountIsLoading } = useAccounts(query);

  const [resultLoaded, setResultLoaded] = React.useState(false);

  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    setResultLoaded(false);
    setResults([]);
  }, [query]);

  React.useEffect(() => {
    if (!blockIsLoading && !txIsLoading && !accountIsLoading) {
      const allResults = [];
      if (blockData && blockData.block) {
        allResults.push({
          type: 'block',
          link: `/block/${blockData.block.id}`,
          block: blockData.block,
        });
      }
      if (txData && txData.transaction) {
        allResults.push({
          type: 'tx',
          link: `/tx/${txData.transaction.id}`,
          tx: txData.transaction,
        });
      }
      if (accountData && accountData.accounts[0]) {
        allResults.push({
          type: 'account',
          link: `/account/${accountData.accounts[0].id}`,
          account: accountData.accounts[0],
        });
      }

      setResults(allResults);
      setResultLoaded(true);
    }
  }, [blockIsLoading, blockData, txIsLoading, txData, accountIsLoading, accountData, query]);

  return {
    loaded: resultLoaded,
    results,
  };
};

export default useSearch;
