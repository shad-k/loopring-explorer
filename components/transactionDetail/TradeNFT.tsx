import React from "react";
import Image from "next/image";

import AppLink from "../AppLink";

import getDateString from "../../utils/getDateString";
import getTokenAmount from "../../utils/getTokenAmount";
import getTrimmedTxHash from "../../utils/getTrimmedTxHash";

interface ITradeNFTProps {
  transaction: any;
  isPending?: boolean;
}

const TradeNFT: React.FC<ITradeNFTProps> = ({
  transaction,
  isPending = false,
}) => {
  const {
    block,
    accountSeller,
    accountBuyer,
    realizedNFTPrice,
    feeBuyer,
    token,
    data,
    nfts,
    __typename,
  } = transaction;

  return (
    <>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2 lg:w-1/5">Block #</td>
        <td>
          <AppLink path="block" block={block.id}>
            {block.id}
          </AppLink>
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Status</td>
        <td>
          {isPending ? (
            <span className="italic">Pending</span>
          ) : (
            <div className="flex items-center ">
              <Image src={"/green-tick.svg"} height={20} width={20} />{" "}
              <span className="ml-2">{getDateString(block.timestamp)}</span>
            </div>
          )}
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Transaction Type</td>
        <td>{__typename}</td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Seller</td>
        <td>
          <AppLink
            path="account"
            accountId={accountSeller.id}
            address={accountSeller.address}
          >
            <span className="hidden lg:block">
              {accountSeller.address || accountSeller.id}
            </span>
            <span className="lg:hidden">
              {accountSeller.address
                ? getTrimmedTxHash(accountSeller.address, 10, true)
                : accountSeller.id}
            </span>
          </AppLink>
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Buyer</td>
        <td>
          <AppLink
            path="account"
            accountId={accountBuyer.id}
            address={accountBuyer.address}
          >
            <span className="hidden lg:block">
              {accountBuyer.address || accountBuyer.id}
            </span>
            <span className="lg:hidden">
              {accountBuyer.address
                ? getTrimmedTxHash(accountBuyer.address, 10, true)
                : accountBuyer.id}
            </span>
          </AppLink>
        </td>
      </tr>
      {nfts.map((nft, index) => {
        return (
          <tr className="border dark:border-loopring-dark-darkBlue">
            <td className="p-2">NFT {index + 1}</td>
            <td>
              <AppLink path="nft" nftId={nft.id}>
                <span>{nft.id}</span>
              </AppLink>
            </td>
          </tr>
        );
      })}
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">NFT Price</td>
        <td>
          {getTokenAmount(realizedNFTPrice, token.decimals)} {token.symbol}
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Fee</td>
        <td>
          {getTokenAmount(feeBuyer, token.decimals)} {token.symbol}
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Transaction Data</td>
        <td>
          <div className="break-all bg-gray-100 dark:bg-loopring-dark-darkBlue h-32 overflow-auto m-2 rounded p-2 text-gray-500">
            {data}
          </div>
        </td>
      </tr>
    </>
  );
};

export default TradeNFT;
