import React from "react";

import NFT from "../NFT";
import AppLink from "../AppLink";
import { useAccountNftSlotsQuery } from "../../generated/loopringExplorer";
import CursorPagination from "../CursorPagination";

interface Props {
  accountId: string;
}

const AccountNFTs: React.FC<Props> = ({ accountId }) => {
  const TOTAL_COUNT = 10;
  const [afterCursor, setAfterCursor] = React.useState<string>();
  const [beforeCursor, setBeforeCursor] = React.useState<string>();
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  const { data, fetchMore, error, loading } = useAccountNftSlotsQuery({
    variables: {
      where: {
        account: accountId,
      },
    },
  });

  const fetchNextBalances = async () => {
    if (!hasMore) {
      return;
    }

    await fetchMore({
      variables: {
        where: {
          account: accountId,
          id_gt: afterCursor,
        },
      },
    });
  };

  const fetchPreviousBalances = async () => {
    await fetchMore({
      variables: {
        where: {
          account: accountId,
          id_lt: beforeCursor,
        },
      },
    });
  };

  React.useEffect(() => {
    if (data && data.accountNFTSlots) {
      const firstTokenBalance = data.accountNFTSlots[0];
      const lastTokenBalance =
        data.accountNFTSlots[data.accountNFTSlots.length - 1];
      setAfterCursor(lastTokenBalance.id);
      setBeforeCursor(firstTokenBalance.id);
      setHasMore(!(data.accountNFTSlots.length < TOTAL_COUNT));
    }
  }, [data]);

  if (loading) {
    return null;
  }

  if (error) {
    return (
      <div className="text-gray-400 text-2xl h-40 flex items-center justify-center w-full border">
        Couldn't fetch token balances
      </div>
    );
  }

  return (
    <div>
      {data.accountNFTSlots.length === 0 ? (
        <div className="text-gray-400 text-2xl h-40 flex items-center justify-center w-full border">
          No NFTs to show
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {data.accountNFTSlots.map((slot, index) => {
              const { id, balance, nft } = slot;
              if (balance == 0) {
                return null;
              }
              return (
                <AppLink path="nft" nftId={nft.id}>
                  <div
                    key={id}
                    className="border rounded-xl overflow-hidden dark:border-loopring-dark-darkBlue m-4"
                    style={{
                      minHeight: 300,
                      minWidth: 300,
                    }}
                  >
                    <NFT nft={nft} />
                  </div>
                </AppLink>
              );
            })}
          </div>
          <CursorPagination
            onNextClick={fetchNextBalances}
            onPreviousClick={fetchPreviousBalances}
            hasMore={hasMore}
          />
        </>
      )}
    </div>
  );
};

export default AccountNFTs;
