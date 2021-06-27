import { gql } from "graphql-request";

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
      address
    }
  }
`;

export const spotTrade = gql`
  fragment SpotTradeFragment on SpotTrade {
    id
    accountA {
      id
      address
    }
    accountB {
      id
      address
    }
    tokenA {
      name
      symbol
      decimals
    }
    tokenB {
      name
      symbol
      decimals
    }
    tokenAPrice
    tokenBPrice
    fillSA
    fillSB
    __typename
  }
`;
