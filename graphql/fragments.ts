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
