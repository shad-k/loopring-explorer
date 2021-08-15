import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";

import Link from "next/link";

import SearchForm from "../components/SearchForm";
import "../styles/globals.scss";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  let isHomePage = false;
  if (router && router.pathname === "/") {
    isHomePage = true;
  }

  return (
    <main className="w-screen h-screen text-loopring-gray">
      <Head>
        <title>Loopring V2 Explorer</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <header className="bg-white w-screen px-4 py-2">
        <div className="container h-full w-full lg:w-11/12 m-auto flex md:items-center justify-between">
          <div
            onClick={() => router.push("/")}
            className="h-full flex items-center w-4/6 cursor-pointer"
          >
            <Image
              src="/logo-blue.svg"
              width="100"
              height="40"
              className="h-full"
              alt="Loopring Logo"
            />
          </div>
          <nav className="flex-1 flex justify-between text-loopring-blue">
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="https://docs3.loopring.io/en/basics/contracts.html">
              <a target="_blank">Contracts</a>
            </Link>
            <Link href="/exchange">
              <a>Exchange</a>
            </Link>
            <Link href="https://loopring.io/">
              <a target="_blank">Wallet</a>
            </Link>
          </nav>
        </div>
      </header>
      <div className="w-full">
        {isHomePage ? (
          <div className="px-10 py-8 bg-loopring-blue pb-20">
            <div className="lg:w-11/12 m-auto">
              <h1 className="text-4xl text-white">
                The Loopring zkRollup Explorer
              </h1>
              <SearchForm className="flex md:w-3/5 mt-4" />
            </div>
          </div>
        ) : (
          <div className="px-10 py-1 bg-loopring-blue">
            <SearchForm className="float-right flex md:w-3/5 m-4" />
            <div className="clear-right" />
          </div>
        )}
        <Component {...pageProps} />
      </div>
    </main>
  );
};

export default MyApp;
