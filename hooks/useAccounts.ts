import React from "react";
import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";
import { ethers } from "ethers";

import { INFURA_ENDPOINT, LOOPRING_SUBGRAPH } from "../utils/config";
import { account, token } from "../graphql/fragments";

const provider = new ethers.providers.JsonRpcProvider(INFURA_ENDPOINT);

const FETCH_ACCOUNTS = gql`
  query accounts(
    $skip: Int
    $first: Int
    $orderBy: Transaction_orderBy
    $orderDirection: OrderDirection
    $block: Block_height
    $where: Account_filter
  ) {
    accounts(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      block: $block
      where: $where
    ) {
      id
      ...AccountFragment
      balances {
        id
        balance
        token {
          ...TokenFragment
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

  ${account}
  ${token}
`;

const useAccounts = (id) => {
  const [address, setAddress] = React.useState(null);

  React.useEffect(() => {
    setAddress(null);
    console.log(id);

    if (id) {
      (async () => {
        if (id && id.indexOf(".") > -1) {
          const address = await provider.resolveName(id);
          console.log(address);
          setAddress(address);
        } else if (id && id.startsWith("0x")) {
          setAddress(id.toLowerCase());
        } else {
          setAddress(id);
        }
      })();
    }
  }, [id]);

  console.log(address);

  let variables: any = {
    skip: 0,
    first: 1,
    where: {
      ...(address && address.startsWith("0x") ? { address } : { id: address }),
    },
  };

  const { data, error } = useSWR(address ? [FETCH_ACCOUNTS] : null, (query) =>
    request(LOOPRING_SUBGRAPH, query, variables)
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useAccounts;
