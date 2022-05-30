import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { LOOPRING_SUBGRAPH, UNISWAP_SUBGRAPH } from '../utils/config';

const loopringLink = new HttpLink({
  uri: LOOPRING_SUBGRAPH,
});

const uniswapLink = new HttpLink({
  uri: UNISWAP_SUBGRAPH,
});

const client = new ApolloClient({
  link: split((op) => op.getContext().protocol === 'uniswap', uniswapLink, loopringLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          accountTokenBalances: {
            keyArgs: false,
          },
          accountNFTSlots: {
            keyArgs: false,
          },
          blocks: {
            keyArgs: false,
          },
          pairs: {
            keyArgs: false,
          },
          transactions: {
            keyArgs: false,
          },
          swaps: {
            keyArgs: false,
          },
          orderbookTrades: {
            keyArgs: false,
          },
          transactionNFTs: {
            keyArgs: false,
          },
          nonFungibleTokens: {
            keyArgs: false,
          },
        },
      },
    },
    possibleTypes: {
      Account: ['User', 'Pool', 'ProtocolAccount'],
    },
  }),
});

export default client;
