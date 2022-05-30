import { gql } from '@apollo/client';
import { account, dataNFT, mintNFT, nft, swapNFT, token, tradeNFT, transferNFT, withdrawalNFT } from '../fragments';

export const FETCH_NFT = gql`
  query nonFungibleToken($id: ID!) {
    nonFungibleToken(id: $id) {
      ...NFTFragment
      __typename
    }
  }

  ${account}
  ${nft}
`;

export const FETCH_NFT_TXS = gql`
  query transactionNFTs($orderDirection: OrderDirection, $where: TransactionNFT_filter) {
    transactionNFTs(first: 10, orderBy: internalID, orderDirection: $orderDirection, where: $where) {
      id
      internalID
      block {
        id
        blockHash
        timestamp
      }
      data

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
  ${nft}

  ${tradeNFT}
  ${swapNFT}
  ${withdrawalNFT}
  ${transferNFT}
  ${mintNFT}
  ${dataNFT}
`;

export const FETCH_NFTS_BY_COLLECTION = gql`
  query nonFungibleTokens($where: NonFungibleToken_filter, $first: Int, $orderDirection: OrderDirection) {
    nonFungibleTokens(where: $where, first: $first, orderDirection: $orderDirection, orderBy: nftID) {
      ...NFTFragment
      __typename
    }
  }

  ${account}
  ${nft}
`;
