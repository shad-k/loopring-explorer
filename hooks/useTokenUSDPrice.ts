import React from "react";
import LRUCache from "../utils/cache";
import { USD_PRICE_ENDPOINT } from "../utils/config";

const usdPriceCache = new LRUCache();
const useTokenUSDPrice = (token) => {
  const [price, setPrice] = React.useState<number>();

  React.useEffect(() => {
    if (token && token.toLowerCase() === "usdt") {
      setPrice(1);
    } else if (token) {
      (async () => {
        let usdPrice = Number(usdPriceCache.get(token));
        if (!usdPrice) {
          const res = await fetch(
            `${USD_PRICE_ENDPOINT}sellToken=USDT&buyToken=${token}&sellAmount=1`
          ).then((res) => res.json());
          usdPrice = 1 / parseFloat(res.price);
          usdPriceCache.set(token, usdPrice);
        }
        setPrice(usdPrice);
      })();
    }
  }, [token]);

  return {
    price,
    loading: !price,
  };
};

export default useTokenUSDPrice;
