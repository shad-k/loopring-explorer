import React from 'react';
import { gql, useQuery } from '@apollo/client';

import LRUCache from '../utils/cache';

/**
 * colocated because this is the only uniswap query used and we can skip
 * codegen for this
 */
const FETCH_USD_PRICE = gql`
  query tokenDayDatas($address: String!) {
    tokenDayDatas(orderBy: date, orderDirection: desc, where: { token: $address }, first: 1) {
      priceUSD
    }
  }
`;

const usdPriceCache = new LRUCache();

const useTokenUSDPrice = (token) => {
  React.useDebugValue(token?.address);

  const [price, setPrice] = React.useState<number>(() => Number(usdPriceCache.get(token?.address)) ?? null);
  const memoizedVariables = React.useMemo(() => {
    if (token) {
      return {
        address: token?.symbol?.toLowerCase() === 'eth' ? '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' : token.address,
      };
    }
    return null;
  }, [token]);

  const { data, loading } = useQuery(FETCH_USD_PRICE, {
    skip: !(token && !price),
    variables: memoizedVariables,
    context: {
      protocol: 'uniswap',
    },
  });

  React.useEffect(() => {
    if (data && data?.tokenDayDatas?.length > 0) {
      const [{ priceUSD }] = data.tokenDayDatas;
      if (priceUSD) {
        setPrice(Number(priceUSD));
        usdPriceCache.set(token.address, Number(priceUSD));
      }
    }
  }, [data]);

  React.useEffect(() => {
    if (token) {
      const cache = usdPriceCache.get(token.address);

      if (cache) {
        setPrice(Number(cache));
      }
    }
  }, [token]);

  return {
    price,
    isLoading: loading,
  };
};

export default useTokenUSDPrice;
