import React from "react";
import { useRouter } from "next/router";

import useBlock from "../../hooks/useBlock";
import getDateString from "../../utils/getDateString";
import weiToGwei from "../../utils/weiToGwei";
import AppLink from "../../components/AppLink";

const Block: React.FC<{}> = () => {
  const router = useRouter();
  const blockId = router.query.id;
  const { data, error } = useBlock(blockId);
  console.log(blockId, data);
  return (
    <div className="bg-white shadow-custom rounded p-4">
      <h1 className="text-3xl mb-5">Block #{blockId}</h1>
      <div className="border rounded w-full">
        {data && (
          <table className="w-full table-auto table-fixed">
            <tbody>
              <tr className="border">
                <td className="p-2 w-1/5">Block Hash</td>
                <td>{data.block.blockHash}</td>
              </tr>
              <tr className="border">
                <td className="p-2">Block Size</td>
                <td>{data.block.blockSize}</td>
              </tr>
              <tr className="border">
                <td className="p-2">L1 Transaction Hash</td>
                <td>
                  <AppLink
                    path="transaction"
                    isExplorerLink
                    tx={data.block.txHash}
                  >
                    {data.block.txHash}
                  </AppLink>
                </td>
              </tr>
              <tr className="border">
                <td className="p-2">Submitted at</td>
                <td>{getDateString(data.block.timestamp * 1000)}</td>
              </tr>
              <tr className="border">
                <td className="p-2">Operator ID</td>
                <td>
                  <AppLink
                    path="account"
                    accountId={data.block.operatorAccountID}
                  >
                    {data.block.operatorAccountID}
                  </AppLink>
                </td>
              </tr>
              <tr className="border">
                <td className="p-2">Raw Data</td>
                <td>
                  <div className="break-all bg-gray-100 h-32 overflow-auto m-2 rounded p-2 text-gray-500">
                    {data.block.data}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Block;

// timestamp
//   txHash
//   gasUsed
//   gasPrice
//   height
//   blockHash
//   operatorAccountID
//   operatorAccount {
//     address
//   }
//   transactions {
//     id
//     hash
//   }
