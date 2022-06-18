import React from 'react';

const NFTAnimation: React.FC<{ animationURL: string; animationType: string }> = ({ animationURL, animationType }) => {
  if (animationType?.startsWith('video')) {
    return <video src={animationURL as string} autoPlay muted controls loop className="z-10 h-full" />;
  } else if (animationType?.startsWith('text/html')) {
    return <iframe src={animationURL as string} className="z-10 h-full" />;
  } else {
    return null;
  }
};

export default NFTAnimation;
