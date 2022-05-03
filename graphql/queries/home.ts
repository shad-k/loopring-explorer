import { gql } from "@apollo/client";

export const FETCH_NETWORK_STATS = gql`
  query networkStats {
    proxy(id: 0) {
      blockCount
      userCount
      transactionCount
    }
    blocks(first: 10, orderBy: internalID, orderDirection: desc) {
      id
      transactionCount
      timestamp
    }
  }
`;
