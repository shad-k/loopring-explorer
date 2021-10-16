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

  const { image, name } = metadata;

  return (
    <div className="w-full h-full flex flex-col justify-end relative">
      <img
        src="/nft-placeholder.svg"
        className="absolute top-0 right-0 h-full w-full object-cover object-center"
      />
      {image && (
        <img src={image as string} alt={name as string} className="flex z-10" />
      )}
      {name && (
        <div className="bg-white text-loopring-gray px-1 py-2 font-medium text-sm z-10">
          {name}
        </div>
      )}
    </div>
  );
};

export default NFT;
