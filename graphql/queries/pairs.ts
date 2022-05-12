import { gql } from '@apollo/client';
import { account, orderbookTrade, pool, swap, token } from '../fragments';

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

export const FETCH_PAIR = gql`
  query pair($id: ID!, $swapSkip: Int, $swapFirst: Int, $orderbookSkip: Int, $orderbookFirst: Int) {
    pair(id: $id) {
      id
      internalID
      token0 {
        ...TokenFragment
      }
      token1 {
        ...TokenFragment
      }
      token0Price
      token1Price

      tradedVolumeToken0Swap
      tradedVolumeToken1Swap
      tradedVolumeToken0Orderbook
      tradedVolumeToken1Orderbook

      swaps(skip: $swapSkip, first: $swapFirst, orderDirection: desc, orderBy: internalID) {
        block {
          id
          blockHash
          timestamp
        }
        ...SwapFragment
      }

      trades(skip: $orderbookSkip, first: $orderbookFirst, orderDirection: desc, orderBy: internalID) {
        block {
          id
          blockHash
          timestamp
        }
        ...OrderbookTradeFragment
      }
      dailyEntities(skip: 1, first: 90, orderDirection: desc, orderBy: dayEnd) {
        dayEnd
        tradedVolumeToken0
        tradedVolumeToken1
        tradedVolumeToken0Swap
        tradedVolumeToken1Swap
        tradedVolumeToken0Orderbook
        tradedVolumeToken1Orderbook
      }
      weeklyEntities(skip: 1, first: 90, orderDirection: desc, orderBy: weekEnd) {
        weekEnd
        tradedVolumeToken0
        tradedVolumeToken1
        tradedVolumeToken0Swap
        tradedVolumeToken1Swap
        tradedVolumeToken0Orderbook
        tradedVolumeToken1Orderbook
      }
      __typename
    }
  }

  ${swap}
  ${orderbookTrade}
  ${token}
  ${account}
  ${pool}
`;
