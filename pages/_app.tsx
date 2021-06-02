import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import "../styles/globals.scss";
import SearchForm from "../components/SearchForm";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <main className="w-screen h-screen">
      <Head>
        <title>Loopring V2 Explorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-loopring w-screen px-4 py-2 text-white">
        <div className="container h-full w-full lg:w-4/5 m-auto flex md:items-center justify-between flex-col md:flex-row">
          <div
            onClick={() => router.push("/")}
            className="h-full flex items-center"
          >
            <Image
              src="/loopring-white.svg"
              width="40"
              height="40"
              className="h-full"
              alt="Loopring Logo"
            />
            <span className="ml-2 mr-12">LoopringV2 Explorer</span>
          </div>
          <SearchForm className="flex md:w-2/5 mt-2 md:mt-0" />
        </div>
      </header>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
