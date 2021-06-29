import React from "react";
import useAccount from "./useAccount";
import useBlock from "./useBlock";
import useTransaction from "./useTransaction";

const useSearch = (query: string) => {
  const { data: blockData, isLoading: blockIsLoading } = useBlock(query);
  const { data: txData, isLoading: txIsLoading } = useTransaction(query);
  const { data: accountData, isLoading: accountIsLoading } = useAccount(query);

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
          type: "block",
          link: `/block/${blockData.block.id}`,
          block: blockData.block,
        });
      }
      if (txData && txData.transaction) {
        allResults.push({
          type: "tx",
          link: `/tx/${txData.transaction.id}`,
          tx: txData.transaction,
        });
      }
      if (accountData && accountData.account) {
        allResults.push({
          type: "account",
          link: `/account/${accountData.account.id}`,
          account: accountData.account,
        });
      }

      setResults(allResults);
      setResultLoaded(true);
    }
  }, [
    blockIsLoading,
    blockData,
    txIsLoading,
    txData,
    accountIsLoading,
    accountData,
    query,
  ]);

  return {
    loaded: resultLoaded,
    results,
  };
};

export default useSearch;
