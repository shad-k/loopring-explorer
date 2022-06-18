import React from 'react';
import Image from 'next/image';
import { AiOutlineLoading3Quarters as Loader } from 'react-icons/ai';

import AppLink from '../AppLink';
import getDateString from '../../utils/getDateString';
import getTokenAmount from '../../utils/getTokenAmount';
import getTrimmedTxHash from '../../utils/getTrimmedTxHash';
import useTokens from '../../hooks/useTokens';

interface IRemoveProps {
  transaction: any;
  isPending?: boolean;
}

const Remove: React.FC<IRemoveProps> = ({ transaction, isPending = false }) => {
  const { block, account, token, data, pool, amount, feeToken, fee, __typename } = transaction;

  const { data: tokens } = useTokens();

  let tokenDetails = null;
  if (!token.symbol) {
    tokenDetails = tokens.find(({ tokenId }) => tokenId === parseInt(token.id));
  }

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
        <td>Amm Exit</td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">User Account</td>
        <td>
          <AppLink path="account" accountId={account.id} address={account.address}>
            <span className="hidden lg:block">{account.address || account.id}</span>
            <span className="lg:hidden">
              {account.address ? getTrimmedTxHash(account.address, 10, true) : account.id}
            </span>
          </AppLink>
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Pool</td>
        <td>
          <AppLink path="account" accountId={pool.id} address={pool.address}>
            <span className="hidden lg:block">{pool.address || pool.id}</span>
            <span className="lg:hidden">{pool.address ? getTrimmedTxHash(pool.address, 10, true) : pool.id}</span>
          </AppLink>
        </td>
      </tr>
      <tr className="border dark:border-loopring-dark-darkBlue">
        <td className="p-2">Token Removed</td>
        <td>
          {token.symbol ? (
            <td>
              {getTokenAmount(amount, token.decimals)} {token.symbol}
            </td>
          ) : tokenDetails ? (
            <td>
              {getTokenAmount(amount, tokenDetails.decimals)} {tokenDetails.symbol}
            </td>
          ) : (
            <Loader className="animate-spin" />
          )}
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

export default Remove;
