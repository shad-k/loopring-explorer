import React from "react";
import useTokenUSDPrice from "../hooks/useTokenUSDPrice";
import numeral from "numeral";

interface Token {
  symbol: string;
  decimal: number;
}
const USDPriceValue: React.FC<{ token: Token; value: number }> = ({
  token,
  value,
}) => {
  const { loading, price } = useTokenUSDPrice(token.symbol);

  if (!loading) {
    return <>{numeral(price * value).format("0.0a")}</>;
  }
  return null;
};

export default USDPriceValue;
