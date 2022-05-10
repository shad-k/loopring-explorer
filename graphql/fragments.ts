import { gql } from '@apollo/client';

export const account = gql`
  fragment AccountFragment on Account {
    id
    address
  }
`;

export const token = gql`
  fragment TokenFragment on Token {
    id
    name
    symbol
    decimals
    address
  }
`;

export const block = gql`
  fragment BlockFragment on Block {
    id
    timestamp
    txHash
    gasLimit
    gasPrice
    height
    blockHash
    blockSize
    gasPrice
    operatorAccount {
      ...AccountFragment
    }
  }
  ${account}
`;

export const pool = gql`
  fragment PoolFragment on Pool {
    id
    address
    balances {
      id
      balance
      token {
        ...TokenFragment
      }
    }
  }
`;

export const nft = gql`
  fragment NFTFragment on NonFungibleToken {
    id
    minter {
      ...AccountFragment
    }
    nftID
    nftType
    token
  }
`;

export const add = gql`
  fragment AddFragment on Add {
    id
    account {
      ...AccountFragment
    }
    pool {
      ...PoolFragment
    }
    token {
      ...TokenFragment
    }
    feeToken {
      ...TokenFragment
    }
    amount
    fee
    __typename
  }
`;

export const remove = gql`
  fragment RemoveFragment on Remove {
    id
    account {
      ...AccountFragment
    }
    pool {
      ...PoolFragment
    }
    token {
      ...TokenFragment
    }
    feeToken {
      ...TokenFragment
    }
    amount
    fee
    __typename
  }
`;

export const swap = gql`
  fragment SwapFragment on Swap {
    id
    account {
      ...AccountFragment
    }
    pool {
      ...PoolFragment
    }
    tokenA {
      ...TokenFragment
    }
    tokenB {
      ...TokenFragment
    }
    pair {
      id
      token0 {
        symbol
      }
      token1 {
        symbol
      }
    }
    tokenAPrice
    tokenBPrice
    fillSA
    fillSB
    fillBA
    protocolFeeA
    protocolFeeB
    feeA
    feeB
    __typename
  }
`;

export const orderbookTrade = gql`
  fragment OrderbookTradeFragment on OrderbookTrade {
    id
    accountA {
      ...AccountFragment
    }
    accountB {
      ...AccountFragment
    }
    tokenA {
      ...TokenFragment
    }
    tokenB {
      ...TokenFragment
    }
    pair {
      id
      token0 {
        symbol
      }
      token1 {
        symbol
      }
    }
    tokenAPrice
    tokenBPrice
    fillSA
    fillSB
    fillBA
    fillBB
    fillAmountBorSA
    fillAmountBorSB
    feeA
    feeB
    __typename
  }
`;

export const deposit = gql`
  fragment DepositFragment on Deposit {
    id
    toAccount {
      ...AccountFragment
    }
    token {
      ...TokenFragment
    }
    amount
    __typename
  }
`;

export const withdrawal = gql`
  fragment WithdrawalFragment on Withdrawal {
    fromAccount {
      ...AccountFragment
    }
    withdrawalToken: token {
      ...TokenFragment
    }
    withdrawalFeeToken: feeToken {
      ...TokenFragment
    }
    amount
    fee
    __typename
  }
`;

export const transfer = gql`
  fragment TransferFragment on Transfer {
    fromAccount {
      ...AccountFragment
    }
    toAccount {
      ...AccountFragment
    }
    token {
      ...TokenFragment
    }
    feeToken {
      ...TokenFragment
    }
    amount
    fee
    __typename
  }
`;

export const accountUpdate = gql`
  fragment AccountUpdateFragment on AccountUpdate {
    user {
      id
      address
      publicKey
    }
    feeToken {
      ...TokenFragment
    }
    fee
    nonce
    __typename
  }
`;

export const ammUpdate = gql`
  fragment AmmUpdateFragment on AmmUpdate {
    pool {
      ...PoolFragment
    }
    tokenID
    feeBips
    tokenWeight
    nonce
    balance
    tokenBalances {
      id
      balance
      token {
        ...TokenFragment
      }
    }
    __typename
  }
`;

export const signatureVerification = gql`
  fragment SignatureVerificationFragment on SignatureVerification {
    account {
      ...AccountFragment
    }
    verificationData
    __typename
  }
`;

export const tradeNFT = gql`
  fragment TradeNFTFragment on TradeNFT {
    accountSeller {
      ...AccountFragment
    }
    accountBuyer {
      ...AccountFragment
    }
    token {
      ...TokenFragment
    }
    nfts {
      ...NFTFragment
    }
    realizedNFTPrice
    feeBuyer
    protocolFeeBuyer
    __typename
  }
`;

export const swapNFT = gql`
  fragment SwapNFTFragment on SwapNFT {
    accountA {
      ...AccountFragment
    }
    accountB {
      ...AccountFragment
    }
    nfts {
      ...NFTFragment
    }
    __typename
  }
`;

export const withdrawalNFT = gql`
  fragment WithdrawalNFTFragment on WithdrawalNFT {
    fromAccount {
      ...AccountFragment
    }
    fee
    withdrawalNFTFeeToken: feeToken {
      ...TokenFragment
    }
    nfts {
      ...NFTFragment
    }
    __typename
  }
`;

export const transferNFT = gql`
  fragment TransferNFTFragment on TransferNFT {
    fromAccount {
      ...AccountFragment
    }
    toAccount {
      ...AccountFragment
    }
    feeToken {
      ...TokenFragment
    }
    nfts {
      ...NFTFragment
    }
    fee
    __typename
  }
`;

export const mintNFT = gql`
  fragment MintNFTFragment on MintNFT {
    minter {
      ...AccountFragment
    }
    receiver {
      ...AccountFragment
    }
    receiverSlot {
      id
    }
    nft {
      id
    }
    fee
    feeToken {
      ...TokenFragment
    }
    amount
    __typename
  }
`;

export const dataNFT = gql`
  fragment DataNFTFragment on DataNFT {
    __typename
  }
`;
