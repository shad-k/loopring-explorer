import React from "react";
import { useRouter } from "next/router";
import useNFTSlot from "../../hooks/useNFTSlot";
import useCachedNFT from "../../hooks/useCachedNFT";
import getTrimmedTxHash from "../../utils/getTrimmedTxHash";
import AppLink from "../../components/AppLink";
import { token } from "../../graphql/fragments";
import NFTTransactions from "../../components/nftDetail/NFTTransactions";

const NFTDetail: React.FC<{}> = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { data } = useNFTSlot(router.query.id);
  const { account, nft, id } = data?.accountNFTSlot ?? {};
  const metadata = useCachedNFT(nft);
  const { image, name } = metadata;

  return (
    <div className="pt-12">
      <div className="flex flex-col lg:flex-row lg:w-10/12 mx-auto">
        <div className="w-full lg:w-4/12 relative" style={{ height: 400 }}>
          {!isLoaded && (
            <img
              src="/nft-placeholder.svg"
              className="absolute top-0 right-0 h-full w-full object-cover object-center animate-pulse"
            />
          )}
          {image && (
            <img
              src={image as string}
              alt={name as string}
              className="z-10 object-contain object-center m-auto h-full"
              ref={(imageElement) => {
                if (imageElement) {
                  imageElement.onload = () => setIsLoaded(true);
                }
              }}
            />
          )}
        </div>
        <div className="w-full lg:w-3/5 lg:pl-12 py-4 h-fulls tracking-wider flex flex-col">
          <h1 className="text-2xl lg:text-3xl font-bold p-2 lg:p-0">
            {name ? (
              name
            ) : (
              <div className="w-2/3 animate-pulse h-8 bg-gray-400 rounded" />
            )}
          </h1>
          <h3 className="text-xl flex-1 p-2 lg:py-2 lg:px-0">
            Owned By:{" "}
            <AppLink path="account" accountId={account?.id}>
              {" "}
              {account && getTrimmedTxHash(account.address, 10, false)}
            </AppLink>
          </h3>

          <div className="w-full overflow-auto">
            <table className="border dark:border-loopring-dark-darkBlue w-full">
              <tbody>
                <tr>
                  <td className="p-4 bg-loopring-blue dark:bg-loopring-dark-darkBlue w-40 lg:w-44 text-white">
                    NFT ID
                  </td>
                  <td className="pl-6 dark:text-white">
                    {id && id.replace(/(.*)-(.*)/, "$2")}
                  </td>
                </tr>
                <tr>
                  <td className="p-4 bg-loopring-blue dark:bg-loopring-dark-darkBlue w-40 lg:w-44 text-white">
                    Minter
                  </td>
                  <td className="pl-6 dark:text-white">
                    <AppLink path="account" accountId={nft?.minter.id}>
                      <span className="hidden xl:block">
                        {nft?.minter.address}
                      </span>
                      <span className="xl:hidden">
                        {nft?.minter.address &&
                          getTrimmedTxHash(nft?.minter.address, 15)}
                      </span>
                    </AppLink>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 bg-loopring-blue dark:bg-loopring-dark-darkBlue w-40 lg:w-44 text-white">
                    Token Address
                  </td>
                  <td className="pl-6 dark:text-white">
                    <AppLink
                      path="account"
                      address={nft?.token}
                      isExplorerLink
                      accountId={nft?.token}
                    >
                      <span className="hidden xl:block">{nft?.token}</span>
                      <span className="xl:hidden">
                        {nft?.token && getTrimmedTxHash(nft?.token, 15)}
                      </span>
                    </AppLink>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 bg-loopring-blue dark:bg-loopring-dark-darkBlue w-40 lg:w-44 text-white">
                    Token Standard
                  </td>
                  <td className="pl-6 dark:text-white">
                    {nft?.nftType === 1
                      ? "ERC-721"
                      : nft?.nftType === 0
                      ? "ERC-1155"
                      : null}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-8 mx-auto px-4">
        <NFTTransactions nftId={nft?.id} />
      </div>
    </div>
  );
};

export default NFTDetail;
