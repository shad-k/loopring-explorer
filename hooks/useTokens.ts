import React from 'react';

import { LOOPRING_API } from '../utils/config';

let tokensCached;

const useTokens = () => {
  const [tokens, setTokens] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      if (!tokensCached) {
        try {
          const res = await fetch(`${LOOPRING_API}exchange/tokens`).then((res) => res.json());
          setTokens(res);
          tokensCached = res;
        } catch (error) {
          console.log(error);
        }
      } else {
        setTokens(tokensCached);
      }
    })();
  }, []);

  return {
    data: tokens,
    isLoading: !tokens,
  };
};

export default useTokens;
