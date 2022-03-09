import React from "react";
import Link from "next/link";
import useCheckTxConfirmation from "../../../hooks/useCheckTxConfirmation";

const PendingTradeOrSwap: React.FC<{ trade: any }> = ({ trade }) => {
  const accountId = trade[9];
  const tokenId = trade[10];
  const storageId = trade[11];
  const { data: confirmedTx } = useCheckTxConfirmation(
    accountId,
    tokenId,
    storageId
  );
  const isConfirmed =
    confirmedTx &&
    (confirmedTx.orderbookTrades.length > 0 || confirmedTx.swaps.length > 0);

  return (
    <tr>
      <td className="p-2 text-center">{trade[2]}</td>
      <td className="p-2 text-center">{trade[5]}</td>
      <td className="p-2 text-center">
        {isConfirmed ? (
          <>
            <Link href={`/tx/${accountId}-${tokenId}-${storageId}`}>
              <a className="border border-loopring-blue rounded-sm px-2 py-1 text-sm hidden md:block">
                Go to Verified Transaction
              </a>
            </Link>
            <Link href={`/tx/${accountId}-${tokenId}-${storageId}`}>
              <a className="border border-loopring-blue rounded-sm px-2 py-1 text-sm md:hidden">
                Verified
              </a>
            </Link>
          </>
        ) : (
          <Link href={`/tx/${accountId}-${tokenId}-${storageId}`}>
            <a className="italic text-sm">Pending</a>
          </Link>
        )}
      </td>
    </tr>
  );
};

export default PendingTradeOrSwap;
