import React from "react";
import Link from "next/link";
import useCheckTxConfirmation from "../../../hooks/useCheckTxConfirmation";
import getTrimmedTxHash from "../../../utils/getTrimmedTxHash";
import useTokens from "../../../hooks/useTokens";

const PendingNFTTrade: React.FC<{ trade: any }> = ({ trade }) => {
  const accountId = trade[13];
  const tokenId = trade[7];
  const storageId = trade[16];
  const { data: confirmedTx } = useCheckTxConfirmation(
    accountId,
    tokenId,
    storageId
  );
  const { data: tokensData } = useTokens();
  const isConfirmed = confirmedTx && confirmedTx.tradeNFTs.length > 0;

  const tx = isConfirmed && confirmedTx.tradeNFTs[0];

  const nftTradeDataFeeToken = tokensData.find(
    (token) => token.tokenId == parseInt(trade[8])
  );
  return (
    <tr>
      <td className="p-2 text-center">
        {getTrimmedTxHash(trade[1], 16, true)}
      </td>
      <td className="p-2 text-center">
        {trade[4]} {nftTradeDataFeeToken ? nftTradeDataFeeToken.symbol : ""}
      </td>
      <td className="p-2 text-center">
        {isConfirmed && tx ? (
          <>
            <Link href={`/tx/${tx.id}`}>
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

export default PendingNFTTrade;
