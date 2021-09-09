import React from "react";

import AppLink from "../AppLink";
import getDateString from "../../utils/getDateString";
import getTrimmedTxHash from "../../utils/getTrimmedTxHash";

const SignatureVerification: React.FC<{ transaction: any }> = ({
  transaction,
}) => {
  const { block, account, verificationData, data, __typename } = transaction;

  return (
    <>
      <tr className="border">
        <td className="p-2 lg:w-1/5">Block #</td>
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
        <td className="p-2">Account</td>
        <td>
          <AppLink path="account" accountId={account.id}>
            <span className="hidden lg:block">{account.address}</span>
            <span className="lg:hidden">
              {getTrimmedTxHash(account.address)}
            </span>
          </AppLink>
        </td>
      </tr>
      <tr className="border">
        <td className="p-2">Verification Data</td>
        <td>
          <div className="break-all bg-gray-100 h-32 overflow-auto m-2 rounded p-2 text-gray-500">
            {verificationData}
          </div>
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

export default SignatureVerification;
