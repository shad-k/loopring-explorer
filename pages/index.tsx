import React from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

import client from '../graphql';
import { FETCH_NETWORK_STATS } from '../graphql/queries/home';

import Blocks from '../components/Blocks';
import Pairs from '../components/Pairs';
import Transactions from '../components/Transactions';
import NetworkStats from '../components/NetworkStats';
import { useNetworkStatsQuery } from '../generated/loopringExplorer';

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await client.query({ query: FETCH_NETWORK_STATS });

    return {
      props: { networkStats: res.data },
    };
  } catch (error) {
    console.log(error);
    return { props: { networkStats: null } };
  }
};

export default function Home({ networkStats }) {
  const { data: networkStatsData } = useNetworkStatsQuery({
    skip: networkStats,
    fetchPolicy: 'network-only',
  });

  return (
    <div className="mt-10 w-11/12 m-auto">
      <NetworkStats networkStats={networkStats ?? networkStatsData} />
      <div className="w-full mt-8 flex flex-col justify-between">
        <h2 className="text-2xl font-bold p-2 text-loopring-blue dark:text-loopring-dark-gray">Latest Blocks</h2>
        <Blocks isPaginated={false} blocksCount={10} />
        <Link href="/blocks">
          <a className="bg-loopring-darkBlue dark:bg-loopring-dark-blue text-white text-center block rounded-lg py-2 px-6 w-2/3 lg:w-auto m-auto lg:mx-0 mt-5 lg:self-end">
            View More Blocks
          </a>
        </Link>
      </div>
      <div className="w-full mt-8 flex flex-col justify-between">
        <Transactions
          title={
            <h2 className="text-2xl font-bold p-2 text-loopring-blue dark:text-loopring-dark-gray">
              Latest Transactions
            </h2>
          }
          isPaginated={false}
          totalCount={10}
          showFilters={false}
        />
        <Link href="/transactions">
          <a className="bg-loopring-darkBlue dark:bg-loopring-dark-blue text-white text-center block rounded-lg py-2 px-6 w-2/3 lg:w-auto m-auto lg:mx-0 mt-5 mb-6  lg:self-end">
            View More Transactions
          </a>
        </Link>
      </div>
      <div className="w-full mt-8 flex flex-col justify-between">
        <h2 className="text-2xl font-bold p-2 text-loopring-blue dark:text-loopring-dark-gray">Pairs</h2>
        <Pairs isPaginated={false} />
        <Link href="/pairs">
          <a className="bg-loopring-darkBlue dark:bg-loopring-dark-blue text-white text-center block rounded-lg py-2 px-6 w-2/3 lg:w-auto m-auto lg:mx-0 mt-5 mb-6  lg:self-end">
            View More Pairs
          </a>
        </Link>
      </div>
    </div>
  );
}
