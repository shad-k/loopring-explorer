import React from "react";
import useTokenUSDPrice from "../hooks/useTokenUSDPrice";
import numeral from "numeral";

interface Token {
  symbol: string;
  decimal: number;
}

interface Props {
  token0: Token;
  value0: number;
  token1: Token;
  value1: number;
}

const USDPriceValue: React.FC<Props> = ({ token0, value0, token1, value1 }) => {
  const { isLoading: loading0, price: price0 } = useTokenUSDPrice(token0);
  const { isLoading: loading1, price: price1 } = useTokenUSDPrice(token1);

  if (loading0 && loading1) {
    return null;
  }
  if (price0) {
    return <span>{numeral(price0 * value0).format("$0.0a")}</span>;
  } else if (price1) {
    return <span>{numeral(price1 * value1).format("$0.0a")}</span>;
  } else {
    return null;
  }
};

export default USDPriceValue;
