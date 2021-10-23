import { toChecksumAddress } from "ethereum-checksum-address";

// need the symbol here to handle the special case for ethereum.
// The trustwallet repo that hosts the icons doesn't have one for ETH but has one for WETH
const getTokenIcon = (tokenAddress, symbol = "") => {
  if (symbol === "ETH") {
    return "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  }

  return toChecksumAddress(tokenAddress);
};

export default getTokenIcon;
