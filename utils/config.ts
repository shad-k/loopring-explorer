export const LOOPRING_SUBGRAPH =
  "https://api.thegraph.com/subgraphs/name/loopring/loopring";
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

export const NFT_DISALLOW_LIST = [
  "0x2cc9facecb46905fbf52585588fcefb931b5ff3f-0-0x7fe9aebbb0268e5b7e7d0b1e3d777236773f6c76-0x458b2f73f9e0040ef38f777448c17a1200c0ef4ba5f59320eca1f93952d2d43a-0",
];
