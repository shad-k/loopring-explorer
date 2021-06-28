import { gql } from "graphql-request";

const account = gql`
  fragment AccountFragment on Account {
    id
    address
  }
`;

const token = gql`
  fragment TokenFragment on Token {
    name
    symbol
    decimals
  }
`;

export const block = gql`
  fragment BlockFragment on Block {
    id
    timestamp
    txHash
    gasUsed
    gasPrice
    height
    blockHash
    blockSize
    operatorAccountID
    operatorAccount {
      ...AccountFragment
    }
  }
  ${account}
`;

export const spotTrade = gql`
  fragment SpotTradeFragment on SpotTrade {
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
    tokenAPrice
    tokenBPrice
    fillSA
    fillSB
    __typename
  }
  ${account}
  ${token}
`;

export const deposit = gql`
  fragment DepositFragment on Deposit {
    id
    __typename
    toAccount {
      ...AccountFragment
    }
    token {
      ...TokenFragment
    }
    amount
  }
  ${account}
  ${token}
`;
