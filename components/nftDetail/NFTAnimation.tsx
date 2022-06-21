import Script from 'next/script';
import React from 'react';

const NFTAnimation: React.FC<{ animationURL: string; animationType: string; image: string }> = ({
  animationURL,
  animationType,
  image,
}) => {
  if (animationType?.startsWith('video')) {
    return (
      <video
        src={animationURL as string}
        autoPlay
        muted
        controls
        loop
        className="z-10 h-full"
        controlsList="nodownload"
      />
    );
  } else if (animationType?.startsWith('text/html')) {
    return (
      <iframe
        src={animationURL as string}
        className="z-10 h-full w-full"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        sandbox="allow-scripts allow-same-origin"
      />
    );
  } else if (animationType?.startsWith('audio')) {
    return (
      <div className="z-10 h-full w-[400px] flex flex-col">
        <img src={image as string} className="object-contain object-center" />
        <audio
          src={animationURL as string}
          controls
          loop
          className="w-full rounded-none h-12"
          controlsList="nodownload"
        />
      </div>
    );
  } else if (animationType?.startsWith('model')) {
    return (
      <>
        <Script
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
          strategy="lazyOnload"
          type="module"
        />
        <model-viewer
          className="z-10 h-full"
          bounds="tight"
          enable-pan
          autoplay
          src={animationURL}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          environment-image="neutral"
          poster="@NftMetadataService.MakeIPFSLink(nftMetadata?.image)"
          shadow-intensity="1"
        />
      </>
    );
  } else {
    return <img src={image as string} />;
  }
};

export default NFTAnimation;
