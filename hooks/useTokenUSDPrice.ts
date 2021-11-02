import React from "react";
import { gql } from "graphql-request";
import useSWR from "swr";
import request from "graphql-request";

import LRUCache from "../utils/cache";
import { UNISWAP_SUBGRAPH } from "../utils/config";

const FETCH_USD_PRICE = gql`
  query tokenDayDatas($address: String!) {
    tokenDayDatas(
      orderBy: date
      orderDirection: desc
      where: { token: $address }
      first: 1
    ) {
      priceUSD
    }
  }
`;

const usdPriceCache = new LRUCache();

const useTokenUSDPrice = (token) => {
  React.useDebugValue(token?.address);

  const [price, setPrice] = React.useState<number>(
    () => Number(usdPriceCache.get(token?.address)) ?? null
  );
  const memoizedVariables = React.useMemo(() => {
    if (token) {
      return {
        address:
          token?.symbol?.toLowerCase() === "eth"
            ? "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
            : token.address,
      };
    }
    return null;
  }, [token]);

  const { data } = useSWR(
    token && !price ? [FETCH_USD_PRICE, memoizedVariables] : null,
    (query, variables) => request(UNISWAP_SUBGRAPH, query, variables)
  );

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
    isLoading: !price,
  };
};

export default useTokenUSDPrice;
