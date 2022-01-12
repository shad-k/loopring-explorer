import React from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";

import useCollection from "../../hooks/useCollection";
import Pagination from "../../components/Pagination";
import useMintNFTs from "../../hooks/useMintNFTs";
import AppLink from "../../components/AppLink";
import NFT from "../../components/NFT";
import { INFURA_ENDPOINT } from "../../utils/config";
import getTrimmedTxHash from "../../utils/getTrimmedTxHash";

const provider = new ethers.providers.JsonRpcProvider(INFURA_ENDPOINT);
const getMinters = async (address) => {
  if (!address) {
    return [];
  }
  const abi = [
    `function minters()
  external
  view
  returns (address[] memory)`,
  ];
  const nftContract = new ethers.Contract(address, abi, provider);

  return await nftContract.minters();
};

const getCollectionName = async (address) => {
  if (!address) {
    return [];
  }
  try {
    const abi = [
      `function name() public view virtual override returns (string memory)`,
    ];
    const nftContract = new ethers.Contract(address, abi, provider);

    return await nftContract.name();
  } catch (error) {
    return null;
  }
};

const NFTCollection: React.FC<{}> = () => {
  const router = useRouter();
  const ENTRIES_PER_PAGE = 21;
  const [page, setPage] = React.useState<number>(1);
  const { data } = useCollection(
    router.query.address,
    ENTRIES_PER_PAGE,
    (page - 1) * ENTRIES_PER_PAGE
  );
  const { data: mintData } = useMintNFTs(router.query.address);
  const [minters, setMinters] = React.useState([]);
  const [name, setName] = React.useState<string>();

  const pageChangeHandler = (page) => {
    router.push(
      { pathname: router.pathname, query: { ...router.query, page } },
      undefined,
      {
        shallow: true,
      }
    );
  };

  React.useEffect(() => {
    const newPage = parseInt(router.query.page as string);
    console.log("newPage", Boolean(newPage));
    if (router.query && Boolean(newPage) && newPage !== page) {
      setPage(parseInt(router.query.page as string));
    }
  }, [router.query]);

  React.useEffect(() => {
    (async () => {
      const mintersList = await getMinters(router.query.address);
      const name = await getCollectionName(router.query.address);
      setMinters(mintersList);
      setName(name);
    })();
  }, [router.query.address]);

  if (!data || !mintData || minters.length === 0) {
    return null;
  }

  const nfts = data.nonFungibleTokens;
  return (
    <div className="p-10">
      <div className="flex flex-col md:flex-row items-center justify-center py-12">
        {
          <h1 className="text-3xl md:text-6xl w-1/2 text-white text-center">
            {name || getTrimmedTxHash(router.query.address as string, 14, true)}
          </h1>
        }
        <div className="flex flex-wrap md:flex-nowrap items-center w-full md:w-1/2 justify-start mt-4 md:mt-0">
          <div className="flex flex-col md:border-r px-10 items-center w-full md:w-1/3">
            <span className="text-2xl text-white">
              {mintData.mintNFTs.length}
            </span>
            <span className="text-sm">Total</span>
          </div>
          <div className="flex flex-col px-2 md:border-r break-all items-center w-full md:w-1/3 mt-4 md:mt-0">
            Contract Address:
            <AppLink
              path="account"
              address={router.query.address as string}
              isExplorerLink
              accountId=""
            >
              {getTrimmedTxHash(router.query.address as string, 14, true)}
            </AppLink>
          </div>
          <div className="w-full flex flex-col px-2 break-all items-center w-full md:w-1/3 mt-4 md:mt-0">
            Minter:
            <ul>
              {minters.map((minter) => {
                return (
                  <li>
                    <AppLink
                      path="account"
                      address={minter}
                      isExplorerLink
                      accountId=""
                    >
                      {getTrimmedTxHash(minter, 14, true)}
                    </AppLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      {nfts.length === 0 ? (
        <div className="text-gray-400 text-2xl h-40 flex items-center justify-center w-full border">
          No NFTs to show
        </div>
      ) : (
        <>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 m-auto"
            style={{ maxWidth: 1200 }}
          >
            {nfts.map((nft) => {
              // if(!minters.includes(nft.minter.address) && nft.minter.address !== router.query.address) {
              //   return null
              // }

              return (
                <AppLink path="nft" nftId={nft.id} key={nft.id}>
                  <div
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
          <Pagination
            currentPage={page}
            onPageChange={pageChangeHandler}
            total={mintData.mintNFTs.length}
            entriesPerPage={ENTRIES_PER_PAGE}
            isLastPage={
              data && data.nonFungibleTokens.length < ENTRIES_PER_PAGE
            }
          />
        </>
      )}
    </div>
  );
};

export default NFTCollection;
