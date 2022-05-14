import React from 'react';

import NFT from '../NFT';
import AppLink from '../AppLink';
import { OrderDirection, useAccountNftSlotsQuery } from '../../generated/loopringExplorer';
import CursorPagination from '../CursorPagination';

interface Props {
  accountId: string;
}

const AccountNFTs: React.FC<Props> = ({ accountId }) => {
  const TOTAL_COUNT = 8;
  const { data, fetchMore, error, loading } = useAccountNftSlotsQuery({
    variables: {
      where: {
        account: accountId,
      },
      orderDirection: OrderDirection.Desc,
    },
  });

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
            onNextClick={(fetchNext, afterCursor) =>
              fetchNext({
                variables: {
                  where: {
                    account: accountId,
                    id_lt: afterCursor,
                  },
                },
              })
            }
            onPreviousClick={(fetchPrevious, beforeCursor) =>
              fetchPrevious({
                variables: {
                  where: {
                    account: accountId,
                    id_gt: beforeCursor,
                  },
                  orderDirection: OrderDirection.Asc,
                },
                updateQuery(_, data) {
                  return {
                    accountNFTSlots: data.fetchMoreResult.accountNFTSlots.reverse(),
                  };
                },
              })
            }
            data={data}
            dataKey="accountNFTSlots"
            fetchMore={fetchMore}
            totalCount={TOTAL_COUNT}
            orderBy="id"
          />
        </>
      )}
    </div>
  );
};

export default AccountNFTs;
