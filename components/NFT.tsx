import React from "react";

import useCachedNFT from "../hooks/useCachedNFT";
import useConsentContext from "../hooks/useConsentContext";
import { NFT_DISALLOW_LIST } from "../utils/config";

interface NFTData {
  id: string;
  minter: {
    id: string;
    address: string;
  };
  token: string;
  nftType: number;
}

const NFT: React.FC<{ nft: NFTData }> = ({ nft }) => {
  const metadata = useCachedNFT(nft);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { hasConsent, askUserForConsent } = useConsentContext();

  const { image, name } = metadata;
  React.useEffect(() => {
    if (image && image === "/error") {
      setIsLoaded(true);
    }
  }, [image]);

  return (
    <div
      className="w-full h-full flex flex-col justify-end relative"
      style={{
        height: 350,
      }}
    >
      {!isLoaded && (
        <img
          src="/nft-placeholder.svg"
          className="absolute top-0 right-0 h-full w-full object-cover object-center animate-pulse"
        />
      )}
      {image ? (
        image === "/error" ? (
          <img
            src="/nft-error.svg"
            className="top-0 right-0 h-full w-full object-contain object-center bg-white"
          />
        ) : (
          <img
            src={image as string}
            alt={name as string}
            className={`z-10 object-cover object-center w-full ${
              NFT_DISALLOW_LIST.includes(nft.id) || !hasConsent
                ? "filter blur-xl"
                : ""
            }`}
            ref={(imageElement) => {
              if (imageElement) {
                imageElement.onload = () => setIsLoaded(true);
              }
            }}
            style={{
              height: 300,
            }}
          />
        )
      ) : null}
      {!hasConsent && (
        <div
          style={{ height: 300, width: "100%" }}
          className="absolute z-10 top-0 left-0 text-white flex items-center justify-center"
        >
          <button
            className="bg-black bg-opacity-20 rounded-xl px-3 py-2 text-sm text-white"
            onClick={(e) => {
              if (!hasConsent) {
                e.stopPropagation();
                e.preventDefault();
                askUserForConsent();
              }
            }}
          >
            View Content
          </button>
        </div>
      )}
      {name && (
        <div className="bg-loopring-blue dark:bg-loopring-dark-darkBlue text-white px-1 py-2 font-medium text-sm z-10 flex-1 flex items-center">
          {name}
        </div>
      )}
    </div>
  );
};

export default NFT;
