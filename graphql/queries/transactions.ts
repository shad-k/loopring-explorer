import { gql } from '@apollo/client';
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
  tradeNFT,
  swapNFT,
  withdrawalNFT,
  transferNFT,
  mintNFT,
  dataNFT,
  nft,
} from '../fragments';

export const FETCH_TXS = gql`
  query transactions(
    $first: Int
    $orderBy: Transaction_orderBy
    $orderDirection: OrderDirection
    $block: Block_height
    $where: Transaction_filter
  ) {
    transactions(first: $first, orderBy: $orderBy, orderDirection: $orderDirection, block: $block, where: $where) {
      id
      internalID
      block {
        id
        blockHash
        timestamp
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

export const FETCH_TX = gql`
  query transaction($id: ID!) {
    transaction(id: $id) {
      id
      internalID
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

export const FETCH_TX_CONFIRMATION = gql`
  query pendingTransactions(
    $transferWhere: Transfer_filter
    $withdrawalWhere: Withdrawal_filter
    $addWhere: Add_filter
    $removeWhere: Remove_filter
    $orderBookTradeWhere: OrderbookTrade_filter
    $mintNFTWhere: MintNFT_filter
    $withdrawNFTWhere: WithdrawalNFT_filter
    $transferNFTWhere: TransferNFT_filter
    $swapWhere: Swap_filter
    $tradeNFTWhere: TradeNFT_filter
    $accountUpdateWhere: AccountUpdate_filter
  ) {
    transfers(where: $transferWhere) {
      id
    }
    withdrawals(where: $withdrawalWhere) {
      id
    }
    adds(where: $addWhere) {
      id
    }
    removes(where: $removeWhere) {
      id
    }
    orderbookTrades(where: $orderBookTradeWhere) {
      id
    }
    mintNFTs(where: $mintNFTWhere) {
      id
    }
    withdrawalNFTs(where: $withdrawNFTWhere) {
      id
    }
    transferNFTs(where: $transferNFTWhere) {
      id
    }
    swaps(where: $swapWhere) {
      id
    }
    tradeNFTs(where: $tradeNFTWhere) {
      id
    }
    accountUpdates(where: $accountUpdateWhere) {
      id
    }
  }
`;
