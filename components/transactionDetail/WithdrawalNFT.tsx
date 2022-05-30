import React from 'react';
import Image from 'next/image';

import AppLink from '../AppLink';

import getDateString from '../../utils/getDateString';
import getTokenAmount from '../../utils/getTokenAmount';
import getTrimmedTxHash from '../../utils/getTrimmedTxHash';

interface IWithdrawalNFTProps {
  transaction: any;
  isPending?: boolean;
}

const WithdrawalNFT: React.FC<IWithdrawalNFTProps> = ({ transaction, isPending = false }) => {
  const { block, fromAccount, fee, withdrawalNFTFeeToken: feeToken, data, nfts } = transaction;

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
              <Image src={'/green-tick.svg'} height={20} width={20} />{' '}
              <span className="ml-2">{getDateString(block.timestamp)}</span>
            </div>
          )}
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Transaction Type</td>
        <td>NFT Withdrawal</td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">From</td>
        <td>
          <AppLink path="account" accountId={fromAccount.id} address={fromAccount.address}>
            <span className="hidden lg:block">{fromAccount.address}</span>
            <span className="lg:hidden">{getTrimmedTxHash(fromAccount.address, 10, true)}</span>
          </AppLink>
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Fee</td>
        <td>
          {getTokenAmount(fee, feeToken.decimals)} {feeToken.symbol}
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

export default WithdrawalNFT;
