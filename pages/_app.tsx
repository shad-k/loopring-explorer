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
    <main className="w-screen h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-900">
      <Head>
        <title>Loopring V2 Explorer</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <header className="bg-white w-screen px-4 py-2">
        <div className="container h-full w-full lg:w-4/5 m-auto flex md:items-center justify-between">
          <div
            onClick={() => router.push("/")}
            className="h-full flex items-center w-4/5 cursor-pointer"
          >
            <Image
              src="/loopring-black.svg"
              width="40"
              height="40"
              className="h-full"
              alt="Loopring Logo"
            />
            <span className="ml-1 mr-12">Loopring</span>
          </div>
          <nav className="flex-1 flex justify-between">
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="https://docs3.loopring.io/en/basics/contracts.html">
              <a target="_blank">Contracts</a>
            </Link>
            <Link href="/exchange">
              <a>Exchange</a>
            </Link>
          </nav>
        </div>
      </header>
      <div className="w-full lg:w-4/5 m-auto mt-12">
        {isHomePage ? (
          <div className="h-56 rounded-2xl bg-gradient-to-b from-indigo-100 to-indigo-60 p-5">
            <h1 className="text-4xl text-center">Loopring Explorer</h1>
            <SearchForm className="flex md:w-3/5 m-auto" />
          </div>
        ) : (
          <>
            <SearchForm className="float-right flex md:w-2/5 m-auto mb-5" />
            <div className="clear-right" />
          </>
        )}
        <Component {...pageProps} />
      </div>
    </main>
  );
};

export default MyApp;
