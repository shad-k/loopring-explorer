import React from "react";
import { ethers } from "ethers";

import { INFURA_ENDPOINT } from "../utils/config";

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
  const [imageURL, setImageURL] = React.useState(null);
  const [name, setName] = React.useState(null);
  const providerRef = React.useRef(
    new ethers.providers.JsonRpcProvider(INFURA_ENDPOINT)
  );

  const getERC721URI = async () => {
    try {
      const contractABIERC721 = [
        `function tokenURI(uint256 tokenId) public view virtual override returns (string memory)`,
      ];
      //TODO: remove default address
      const nftContract = new ethers.Contract(
        nft.token ?? "0x4f03b26031198d5b69cdd3b1f6756ed14090c94d",
        contractABIERC721,
        providerRef.current
      );
      const uri = await nftContract.tokenURI(nft.id);
      return uri;
    } catch (error) {
      console.error(error);
      return await getERC1155URI();
    }
  };

  const getERC1155URI = async () => {
    try {
      const contractABIERC1155 = [
        `function uri(uint256 id) public returns (string memory)`,
      ];
      //TODO: remove default address
      const nftContract = new ethers.Contract(
        "0x4f03b26031198d5b69cdd3b1f6756ed14090c94d",
        contractABIERC1155,
        providerRef.current
      );
      const uri = await nftContract.uri(nft.id);
      return uri;
    } catch (error) {
      console.error(error);
      return await getERC721URI();
    }
  };

  const getNFTURI = async () => {
    if (nft.nftType === 1) {
      return await getERC721URI();
    } else {
      return await getERC1155URI();
    }
  };

  React.useEffect(() => {
    (async () => {
      const uri = await getNFTURI();
      const metadata = await fetch(
        uri.replace("ipfs://", "https://ipfs.io/ipfs/")
      ).then((res) => res.json());
      setImageURL(metadata?.image?.replace("ipfs://", "https://ipfs.io/ipfs/"));
      setName(metadata?.name);
    })();
  }, []);

  if (!imageURL) {
    return null;
  }
  return (
    <div className="w-full h-full flex flex-col justify-end">
      <img src={imageURL} alt="" className="flex" />
      <div className="bg-white text-loopring-gray px-1 py-2 font-medium text-sm">
        {name}
      </div>
    </div>
  );
};

export default NFT;
