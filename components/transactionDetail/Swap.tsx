import React from "react";

import AppLink from "../AppLink";
import getDateString from "../../utils/getDateString";
import getTokenAmount from "../../utils/getTokenAmount";

const Swap: React.FC<{ transaction: any }> = ({ transaction }) => {
  const [priceDirectionAtoB, setPriceDirectionAtoB] =
    React.useState<boolean>(true);
  const {
    block,
    account,
    tokenA,
    tokenB,
    data,
    fillSA,
    fillSB,
    tokenAPrice,
    tokenBPrice,
    pair,
    __typename,
  } = transaction;

  return (
    <>
      <tr className="border">
        <td className="p-2 w-1/5">Block #</td>
        <td>
          <AppLink path="block" block={block.id}>
            {block.id}
          </AppLink>
        </td>
      </tr>
      <tr className="border">
        <td className="p-2">Submitted at</td>
        <td>{getDateString(block.timestamp)}</td>
      </tr>
      <tr className="border">
        <td className="p-2">Transaction Type</td>
        <td>{__typename}</td>
      </tr>
      <tr className="border">
        <td className="p-2">User Account</td>
        <td>
          <AppLink path="account" accountId={account.id}>
            {account.address}
          </AppLink>
        </td>
      </tr>
      <tr className="border">
        <td className="p-2">Swap</td>
        <td>
          <AppLink path="pair" pair={pair.id}>
            {getTokenAmount(fillSA, tokenA.decimals)} {tokenA.symbol} &harr;{" "}
            {getTokenAmount(fillSB, tokenB.decimals)} {tokenB.symbol}{" "}
          </AppLink>
          <button
            className="hover:bg-blue-100 p-2 mx-2 rounded hover:underline"
            onClick={() => setPriceDirectionAtoB((val) => !val)}
          >
            (
            {priceDirectionAtoB ? (
              <>
                1 {tokenA.symbol} ={" "}
                {getTokenAmount(tokenAPrice, tokenB.decimals).toFixed(2)}{" "}
                {tokenB.symbol}
              </>
            ) : (
              <>
                1 {tokenB.symbol} ={" "}
                {getTokenAmount(tokenBPrice, tokenA.decimals).toFixed(2)}{" "}
                {tokenA.symbol}
              </>
            )}
            )
          </button>
        </td>
      </tr>
      <tr className="border">
        <td className="p-2">Transaction Data</td>
        <td>
          <div className="break-all bg-gray-100 h-32 overflow-auto m-2 rounded p-2 text-gray-500">
            {data}
          </div>
        </td>
      </tr>
    </>
  );
};

export default Swap;
