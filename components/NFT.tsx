import React from "react";
import useCachedNFT from "../hooks/useCachedNFT";

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

  const { image, name } = metadata;
  React.useEffect(() => {
    if (image && image === "/error") {
      setIsLoaded(true);
    }
  }, [image]);
  console.log("image", image);
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
            className="z-10 object-cover object-center w-full"
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
      {name && (
        <div className="bg-white text-loopring-gray px-1 py-2 font-medium text-sm z-10 flex-1 flex items-center">
          {name}
        </div>
      )}
    </div>
  );
};

export default NFT;
