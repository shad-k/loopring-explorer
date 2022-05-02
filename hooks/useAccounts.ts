import React from "react";
import { ethers } from "ethers";

import { INFURA_ENDPOINT } from "../utils/config";
import { useAccountsQuery } from "../generated/loopringExplorer";

const provider = new ethers.providers.JsonRpcProvider(INFURA_ENDPOINT);

type WhereFilter = {
  address?: string;
  id?: string;
};

const useAccounts = (id) => {
  const [address, setAddress] = React.useState(null);

  React.useEffect(() => {
    setAddress(null);
    if (id) {
      (async () => {
        if (id && id.indexOf(".") > -1) {
          const address = await provider.resolveName(id);
          setAddress(address);
        } else if (id && id.startsWith("0x")) {
          setAddress(id.toLowerCase());
        } else {
          setAddress(id);
        }
      })();
    }
  }, [id]);

  const memoVariables = React.useMemo(() => {
    const whereFilter: WhereFilter = {};

    if (address?.startsWith("0x")) {
      whereFilter.address = address;
    } else {
      whereFilter.id = address;
    }
    return {
      first: 1,
      where: whereFilter,
    };
  }, [address]);

  const { data, error, loading } = useAccountsQuery({
    skip: !address,
    variables: memoVariables,
  });

  return {
    data,
    error,
    isLoading: loading,
  };
};

export default useAccounts;
