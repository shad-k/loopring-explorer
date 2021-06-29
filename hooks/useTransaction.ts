import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import { LOOPRING_SUBGRAPH } from "../utils/config";
import {
  account,
  token,
  spotTrade,
  deposit,
  withdrawal,
  transfer,
  accountUpdate,
  ammUpdate,
  signatureVerification,
} from "../graphql/fragments";

const FETCH_TRANSACTION = gql`
  query transaction($id: ID!) {
    transaction(id: $id) {
      id
      block {
        id
        blockHash
        timestamp
      }
      data

      ...SpotTradeFragment
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

  ${spotTrade}
  ${deposit}
  ${withdrawal}
  ${transfer}
  ${accountUpdate}
  ${ammUpdate}
  ${signatureVerification}
`;

const useTransaction = (id) => {
  const { data, error } = useSWR([FETCH_TRANSACTION, id], (query, id) =>
    id
      ? request(LOOPRING_SUBGRAPH, query, {
          id,
        })
      : null
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useTransaction;
