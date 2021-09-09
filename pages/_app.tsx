import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";

import Link from "next/link";

import SearchForm from "../components/SearchForm";
import "../styles/globals.scss";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const [showNav, setShowNav] = React.useState(false);

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
          {showNav && (
            <div
              className="fixed bg-black bg-opacity-30 h-full w-full top-0 left-0 lg:hidden"
              onClick={() => setShowNav(false)}
            />
          )}
          <button onClick={() => setShowNav(true)} className="lg:hidden">
            <div className="h-1 w-6 bg-black m-1" />
            <div className="h-1 w-6 bg-black m-1" />
            <div className="h-1 w-6 bg-black m-1" />
          </button>
          <nav
            className={`flex-1 flex flex-col lg:flex-row lg:justify-between text-loopring-blue fixed w-3/4 h-full lg:static bg-white top-0 right-0 text-xl lg:text-base transition-transform duration-500 transform lg:transform-none ${
              showNav ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <Link href="/">
              <a
                className="border-b border-t p-2 lg:border-none lg:p-0"
                onClick={() => setShowNav(false)}
              >
                Home
              </a>
            </Link>
            <Link href="https://docs3.loopring.io/en/basics/contracts.html">
              <a
                target="_blank"
                className="border-b border-t p-2 lg:border-none lg:p-0"
                onClick={() => setShowNav(false)}
              >
                Contracts
              </a>
            </Link>
            <Link href="https://exchange.loopring.io/">
              <a
                target="_blank"
                className="border-b border-t p-2 lg:border-none lg:p-0"
                onClick={() => setShowNav(false)}
              >
                Exchange
              </a>
            </Link>
            <Link href="https://loopring.io/">
              <a
                target="_blank"
                className="border-b border-t p-2 lg:border-none lg:p-0"
                onClick={() => setShowNav(false)}
              >
                Wallet
              </a>
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
          <div className="px-4 lg:px-10 py-1 bg-loopring-blue">
            <SearchForm className="lg:float-right flex w-full lg:w-3/5 mx-0 my-4 lg:m-4 " />
            <div className="clear-right" />
          </div>
        )}
        <Component {...pageProps} />
      </div>
    </main>
  );
};

export default MyApp;
