import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import { LOOPRING_SUBGRAPH } from "../utils/config";
import {
  account,
  token,
  pool,
  add,
  remove,
  swap,
  orderbookTrade,
  deposit,
  withdrawal,
  transfer,
  accountUpdate,
  ammUpdate,
  signatureVerification,
  tradeNFT,
  swapNFT,
  withdrawalNFT,
  transferNFT,
  mintNFT,
  dataNFT,
  nft,
} from "../graphql/fragments";

const FETCH_TRANSACTION = gql`
  query transaction($id: ID!) {
    transaction(id: $id) {
      id
      block {
        id
        blockHash
        timestamp
        transactionCount
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
      ...TradeNFTFragment
      ...SwapNFTFragment
      ...WithdrawalNFTFragment
      ...TransferNFTFragment
      ...MintNFTFragment
      ...DataNFTFragment
    }
  }

  ${account}
  ${token}
  ${pool}
  ${nft}

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
  ${tradeNFT}
  ${swapNFT}
  ${withdrawalNFT}
  ${transferNFT}
  ${mintNFT}
  ${dataNFT}
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
