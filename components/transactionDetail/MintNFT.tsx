import React from "react";

import AppLink from "../AppLink";

import getDateString from "../../utils/getDateString";
import getTokenAmount from "../../utils/getTokenAmount";
import getTrimmedTxHash from "../../utils/getTrimmedTxHash";

const MintNFT: React.FC<{ transaction: any }> = ({ transaction }) => {
  const { block, minter, receiver, fee, feeToken, data, __typename, nft } =
    transaction;

  return (
    <>
      {block && (
        <tr className="border dark:border-loopring-dark-darkBlue">
          <td className="p-2 lg:w-1/5">Block #</td>
          <td>
            <AppLink path="block" block={block.id}>
              {block.id}
            </AppLink>
          </td>
        </tr>
      )}
      {block && block.timestamp && (
        <tr className="border dark:border-loopring-dark-darkBlue">
          <td className="p-2">Verified at</td>
          <td>{block ? getDateString(block.timestamp) : "pending"}</td>
        </tr>
      )}
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Transaction Type</td>
        <td>{__typename || "MintNFT"}</td>
      </tr>
      {nft.id && (
        <tr className="border dark:border-loopring-dark-darkBlue">
          <td className="p-2">NFT</td>
          <td>
            <AppLink path="nft" nftId={nft.id}>
              <span>{nft.id}</span>
            </AppLink>
          </td>
        </tr>
      )}
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Minter</td>
        <td>
          <AppLink
            path="account"
            accountId={minter.id}
            address={minter.address}
          >
            <span className="hidden lg:block">
              {minter.address || minter.id}
            </span>
            <span className="lg:hidden">
              {minter.address
                ? getTrimmedTxHash(minter.address, 10, true)
                : minter.id}
            </span>
          </AppLink>
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Receiver</td>
        <td>
          <AppLink
            path="account"
            accountId={receiver.id}
            address={receiver.address}
          >
            <span className="hidden lg:block">
              {receiver.address || receiver.id}
            </span>
            <span className="lg:hidden">
              {receiver.address
                ? getTrimmedTxHash(receiver.address, 10, true)
                : receiver.id}
            </span>
          </AppLink>
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Fee</td>
        <td>
          {getTokenAmount(fee, feeToken.decimals)} {feeToken.symbol}
        </td>
      </tr>
      {data && (
        <tr className="border dark:border-loopring-dark-darkBlue">
          <td className="p-2">Transaction Data</td>
          <td>
            <div className="break-all bg-gray-100 dark:bg-loopring-dark-darkBlue h-32 overflow-auto m-2 rounded p-2 text-gray-500">
              {data}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default MintNFT;
