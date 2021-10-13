import React from "react";

import NFT from "../NFT";
import Pagination from "../../components/Pagination";

interface Props {
  slots: Array<any>;
}

const AccountNFTs: React.FC<Props> = ({ slots }) => {
  const TOTAL_COUNT = 10;
  const [balancePage, setBalancePage] = React.useState<number>(1);

  const pageStart = (balancePage - 1) * TOTAL_COUNT;
  const pageEnd = balancePage * TOTAL_COUNT;

  return (
    <div>
      {slots.length === 0 ? (
        <div className="text-gray-400 text-2xl h-40 flex items-center justify-center w-full border">
          No NFTs to show
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {slots.map((slot, index) => {
              if (index >= pageStart && index < pageEnd) {
                const { id, balance, nft } = slot;
                if (balance == 0) {
                  return null;
                }
                return (
                  <div
                    key={id}
                    className="border rounded dark:border-loopring-dark-darkBlue m-4"
                    style={{
                      minHeight: 300,
                      minWidth: 300,
                    }}
                  >
                    <NFT nft={nft} />
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
          <Pagination
            currentPage={balancePage}
            onPageChange={(page) => setBalancePage(page)}
            total={slots.length}
            entriesPerPage={10}
          />
        </>
      )}
    </div>
  );
};

export default AccountNFTs;
