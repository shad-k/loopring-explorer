import React from "react";
import useAccount from "./useAccount";
import useBlock from "./useBlock";
import useTransaction from "./useTransaction";

const useSearch = (query: string) => {
  const { data: blockData, isLoading: blockIsLoading } = useBlock(query);
  const { data: txData, isLoading: txIsLoading } = useTransaction(query);
  const { data: accountData, isLoading: accountIsLoading } = useAccount(query);

  const [resultLoaded, setResultLoaded] = React.useState(false);
  const [redirectLink, setRedirectLink] = React.useState(null);

  // console.log(blockIsLoading, blockData, txIsLoading, txData, accountIsLoading, accountData);

  React.useEffect(() => {
    if (!blockIsLoading && blockData && blockData.block) {
      setResultLoaded(true);
      setRedirectLink(`/block/${blockData.block.id}`);
    } else if (!txIsLoading && txData && txData.transaction) {
      setResultLoaded(true);
      setRedirectLink(`/tx/${txData.transaction.id}`);
    } else if (!accountIsLoading && accountData && accountData.account) {
      setResultLoaded(true);
      setRedirectLink(`/account/${accountData.account.id}`);
    } else if (!blockIsLoading && !txIsLoading && !accountIsLoading) {
      setResultLoaded(true);
      setRedirectLink(null);
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

  React.useEffect(() => {
    setResultLoaded(false);
    setRedirectLink(null);
  }, [query]);

  return {
    loaded: resultLoaded,
    redirectLink,
  };
};

export default useSearch;
