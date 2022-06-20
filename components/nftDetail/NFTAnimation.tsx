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
        className="z-10 h-full"
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
  } else {
    return <img src={image as string} />;
  }
};

export default NFTAnimation;
