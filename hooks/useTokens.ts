import React from 'react';

import { LOOPRING_API } from '../utils/config';

const useTokens = () => {
  const [tokens, setTokens] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${LOOPRING_API}exchange/tokens`).then((res) => res.json());
        setTokens(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return {
    data: tokens,
    isLoading: !tokens,
  };
};

export default useTokens;
