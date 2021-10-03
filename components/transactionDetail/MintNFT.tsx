import React from "react";

import AppLink from "../AppLink";

import getDateString from "../../utils/getDateString";
import getTokenAmount from "../../utils/getTokenAmount";
import getTrimmedTxHash from "../../utils/getTrimmedTxHash";

const MintNFT: React.FC<{ transaction: any }> = ({ transaction }) => {
  const { block, minter, receiver, fee, feeToken, data, __typename } =
    transaction;

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
        <td className="p-2">Verified at</td>
        <td>{getDateString(block.timestamp)}</td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Transaction Type</td>
        <td>{__typename}</td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Minter</td>
        <td>
          <AppLink path="account" accountId={minter.id}>
            <span className="hidden lg:block">{minter.address}</span>
            <span className="lg:hidden">
              {getTrimmedTxHash(minter.address, 10, true)}
            </span>
          </AppLink>
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Receiver</td>
        <td>
          <AppLink path="account" accountId={receiver.id}>
            <span className="hidden lg:block">{receiver.address}</span>
            <span className="lg:hidden">
              {getTrimmedTxHash(receiver.address, 10, true)}
            </span>
          </AppLink>
        </td>
      </tr>
      {/* <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Fee</td>
        <td>
          {getTokenAmount(fee, feeToken.decimals)} {feeToken.symbol}
        </td>
      </tr> */}
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

export default MintNFT;
