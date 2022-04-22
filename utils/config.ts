export const LOOPRING_SUBGRAPH =
  "https://api.thegraph.com/subgraphs/name/juanmardefago/loopring36";
export const EXPLORER_URL = "https://etherscan.io/";
export const INFURA_ENDPOINT =
  process.env.NEXT_PUBLIC_INFURA_ENDPOINT ??
  "https://mainnet.infura.io/v3/873030883ea1405898041be94ab2bfd5";
export const UNISWAP_SUBGRAPH =
  "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2";
export const LOOPRING_API = "https://api3.loopring.io/api/v3/";
export const apiEndpointByTxType = {
  transfer: "user/transactions",
  deposit: "user/transactions",
  withdraw: "user/transactions",
  trade: "user/trades",
  nftMint: "user/nft/mints",
  joinAmm: "user/amm/transactions",
  exitAmm: "user/amm/transactions",
  nftWithdraw: "user/nft/withdrawals",
  nftTransfer: "user/nft/transfers",
  nftDeposit: "user/nft/deposits",
};

export const NFT_DISALLOW_LIST = [];

export enum USER_CONTENT {
  YES = "yes",
  NO = "no",
}
