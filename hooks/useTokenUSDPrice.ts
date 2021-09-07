import React from "react";
import { USD_PRICE_ENDPOINT } from "../utils/config";

const useTokenUSDPrice = (token) => {
  const [price, setPrice] = React.useState<number>();

  React.useEffect(() => {
    if (token) {
      (async () => {
        const res = await fetch(
          `${USD_PRICE_ENDPOINT}sellToken=USDT&buyToken=${token}&sellAmount=1`
        ).then((res) => res.json());
        setPrice(1 / parseFloat(res.price));
      })();
    }
  }, [token]);

  return {
    price,
    loading: !price,
  };
};

export default useTokenUSDPrice;
