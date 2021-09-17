import { useMemo } from "react";
import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import { LOOPRING_SUBGRAPH } from "../utils/config";
import {
  account,
  accountUpdate,
  add,
  ammUpdate,
  deposit,
  orderbookTrade,
  pool,
  remove,
  signatureVerification,
  swap,
  token,
  transfer,
  withdrawal,
} from "../graphql/fragments";

export const FETCH_TXS = gql`
  query transactions(
    $skip: Int
    $first: Int
    $orderBy: Transaction_orderBy
    $orderDirection: OrderDirection
    $block: Block_height
    $where: Transaction_filter
  ) {
    proxy(id: 0) {
      transactionCount
      depositCount
      withdrawalCount
      transferCount
      addCount
      removeCount
      orderbookTradeCount
      swapCount
      accountUpdateCount
      ammUpdateCount
      signatureVerificationCount
    }
    transactions(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      block: $block
      where: $where
    ) {
      id
      block {
        id
        blockHash
        timestamp
        transactionCount
        depositCount
        withdrawalCount
        transferCount
        addCount
        removeCount
        orderbookTradeCount
        swapCount
        accountUpdateCount
        ammUpdateCount
        signatureVerificationCount
      }
      data

      ...AddFragment
      ...RemoveFragment
      ...SwapFragment
      ...OrderbookTradeFragment
      ...DepositFragment
      ...WithdrawalFragment
      ...TransferFragment
      ...AccountUpdateFragment
      ...AmmUpdateFragment
      ...SignatureVerificationFragment
    }
  }

  ${account}
  ${token}
  ${pool}

  ${add}
  ${remove}
  ${swap}
  ${orderbookTrade}
  ${deposit}
  ${withdrawal}
  ${transfer}
  ${accountUpdate}
  ${ammUpdate}
  ${signatureVerification}
`;

const useTransactions = (
  skip = 0,
  first = 10,
  orderBy = "internalID",
  orderDirection = "desc",
  block = null,
  typename = null,
  accounts = []
) => {
  const memoVariables = useMemo(() => {
    const variables = {
      skip,
      first,
      orderBy,
      orderDirection,
      where: {},
    };

    if (block) {
      variables.where = {
        ...variables.where,
        block,
      };
    }
    if (accounts.length > 0) {
      variables.where = {
        ...variables.where,
        accounts,
      };
    }
    if (typename) {
      variables.where = {
        ...variables.where,
        typename,
      };
    }
    return variables;
  }, [skip, first, orderBy, orderDirection, block, typename]);

  const { data, error } = useSWR(
    [FETCH_TXS, memoVariables],
    (query, variables) => request(LOOPRING_SUBGRAPH, query, variables)
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useTransactions;
