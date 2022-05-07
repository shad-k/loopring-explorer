import { gql } from '@apollo/client';
import { token } from '../fragments';

export const FETCH_PAIRS = gql`
  query pairs($first: Int, $where: Pair_filter, $orderDirection: OrderDirection) {
    pairs(first: $first, where: $where, orderBy: tradedVolumeToken0Swap, orderDirection: $orderDirection) {
      id
      internalID
      token0 {
        ...TokenFragment
      }
      token1 {
        ...TokenFragment
      }
      tradedVolumeToken0Swap
      dailyEntities(skip: 1, first: 1, orderBy: dayEnd, orderDirection: desc) {
        tradedVolumeToken1Swap
        tradedVolumeToken0Swap
        id
      }
      weeklyEntities(skip: 0, first: 1, orderBy: weekEnd, orderDirection: desc) {
        tradedVolumeToken1Swap
        tradedVolumeToken0Swap
        id
      }
    }
  }

  ${token}
`;
