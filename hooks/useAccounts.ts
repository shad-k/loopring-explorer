import React from "react";
import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";
import { ethers } from "ethers";

import { INFURA_ENDPOINT, LOOPRING_SUBGRAPH } from "../utils/config";
import { account, nft, token } from "../graphql/fragments";
import { useAccountsQuery } from "../generated/loopringExplorer";

const provider = new ethers.providers.JsonRpcProvider(INFURA_ENDPOINT);

type WhereFilter = {
  address?: string;
  id?: string;
};

const FETCH_ACCOUNTS = gql`
  query accounts(
    $first: Int
    $orderDirection: OrderDirection
    $block: Block_height
    $where: Account_filter
  ) {
    accounts(
      first: $first
      orderDirection: $orderDirection
      block: $block
      where: $where
    ) {
      id
      address
      balances {
        id
        balance
        token {
          ...TokenFragment
        }
      }
      slots {
        id
        nft {
          ...NFTFragment
        }
        balance
        createdAtTransaction {
          id
          block {
            timestamp
          }
        }
      }
      createdAtTransaction {
        id
        block {
          timestamp
        }
      }

      ... on Pool {
        feeBipsAMM
      }

      __typename
    }
  }

  ${token}
  ${nft}
`;

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
