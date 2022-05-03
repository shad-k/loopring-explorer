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
