import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { SWRConfig } from "swr";
import request from "graphql-request";

import "../styles/globals.scss";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  const swrOptions = {
    fetcher: (query) =>
      request(
        "https://api.thegraph.com/subgraphs/name/protofire/loopring-exchange-v2",
        query
      ),
    refreshInterval: 300000, // refetch every 5 minutes
  };

  return (
    <SWRConfig value={swrOptions}>
      <main className="w-screen h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-900">
        <Head>
          <title>Loopring V2 Explorer</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <header className="bg-white w-screen px-4 py-2">
          <div className="container h-full w-full lg:w-4/5 m-auto flex md:items-center justify-between flex-col md:flex-row">
            <div
              onClick={() => router.push("/")}
              className="h-full flex items-center"
            >
              <Image
                src="/loopring-black.svg"
                width="40"
                height="40"
                className="h-full"
                alt="Loopring Logo"
              />
              <span className="ml-2 mr-12">LoopringV2 Explorer</span>
            </div>
          </div>
        </header>
        <Component {...pageProps} />
      </main>
    </SWRConfig>
  );
};

export default MyApp;
