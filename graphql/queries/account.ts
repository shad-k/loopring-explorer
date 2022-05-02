import { gql } from "@apollo/client";

import { nft, token } from "../fragments";

export const FETCH_ACCOUNTS = gql`
  query accounts($first: Int, $where: Account_filter) {
    accounts(first: $first, where: $where) {
      id
      address
      createdAtTransaction {
        id
        block {
          timestamp
        }
      }

      ... on Pool {
        feeBipsAMM
      }

      __typename
    }
  }

  ${token}
  ${nft}
`;

export const FETCH_ACCOUNT_BALANCES = gql`
  query accountTokenBalances($where: AccountTokenBalance_filter) {
    accountTokenBalances(
      orderDirection: asc
      orderBy: id
      first: 10
      where: $where
    ) {
      id
      balance
      token {
        ...TokenFragment
      }
      __typename
    }
  }

  ${token}
`;

// slots(first: 10) {
//   id
//   nft {
//     ...NFTFragment
//   }
//   balance
//   createdAtTransaction {
//     id
//     block {
//       timestamp
//     }
//   }
// }
