import { gql } from '@apollo/client';
import { block } from '../fragments';

export const FETCH_BLOCKS = gql`
  query blocks($first: Int, $where: Block_filter, $orderDirection: OrderDirection) {
    blocks(first: $first, where: $where, orderBy: internalID, orderDirection: $orderDirection) {
      ...BlockFragment
      transactionCount
    }
  }
  ${block}
`;

export const FETCH_BLOCK = gql`
  query block($id: ID!) {
    proxy(id: 0) {
      blockCount
    }
    block(id: $id) {
      ...BlockFragment
      data
    }
  }
  ${block}
`;
