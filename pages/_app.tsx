import { AppProps } from "next/app";
import Head from 'next/head';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import "../styles/globals.scss";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  return (
  <main className='w-screen h-screen'>
    <Head>
        <title>Loopring V2 Explorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-loopring w-screen h-12 px-4 py-2 text-white">
        <div className="container h-full w-full lg:w-3/5 m-auto flex items-center">
          <div onClick={() => router.push('/')} className="h-full flex items-center">
            <Image src="/loopring-white.svg" width="40" height="40" className="h-full" alt="Loopring Logo" />
            <span className="ml-2 mr-12">LoopringV2 Explorer</span>
          </div>
          {/* <Link href="https://etherscan.io/address/0x0baba1ad5be3a5c0a66e7ac838a129bf948f1ea4" >
            <a target="_blank">Contract</a>
          </Link> */}
        </div>
      </header>
      <Component {...pageProps} />
    </main>
    );
};

export default MyApp;
