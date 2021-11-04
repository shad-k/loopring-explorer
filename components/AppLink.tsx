import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { EXPLORER_URL } from "../utils/config";

interface NotTx {
  tx?: never;
}

interface NotBlock {
  block?: never;
}

interface NotAccount {
  accountId?: never;
  address?: never;
}

interface NotToken {
  token?: never;
}

interface NotPair {
  pair?: never;
}

interface NotNFT {
  nftId?: never;
}

interface TxLink extends NotBlock, NotAccount, NotPair, NotToken, NotNFT {
  path: "transaction";
  tx: string;
}

interface BlockLink extends NotTx, NotAccount, NotToken, NotPair, NotNFT {
  path: "block";
  block: string;
}

interface AccountLink extends NotTx, NotBlock, NotToken, NotPair, NotNFT {
  path: "account";
  accountId: string;
  address?: string;
}

interface TokenLink extends NotTx, NotBlock, NotAccount, NotPair, NotNFT {
  path: "token";
  token: string;
}

interface PairLink extends NotTx, NotBlock, NotAccount, NotToken, NotNFT {
  path: "pair";
  pair: string;
}

interface NFTSlot extends NotTx, NotBlock, NotAccount, NotToken, NotPair {
  path: "nft";
  nftId: string;
}

type Props = {
  isExplorerLink?: boolean;
  explorerURL?: string;
  className?: string;
} & (TxLink | BlockLink | AccountLink | TokenLink | PairLink | NFTSlot);

const makeExplorerURL = (explorerURL: string, link: string): string => {
  return `${explorerURL}${explorerURL.substr(-1) === "/" ? "" : "/"}${link}`;
};

const AppLink: React.FC<React.PropsWithChildren<Props>> = ({
  path,
  block,
  tx,
  accountId,
  address,
  pair,
  token,
  nftId,
  isExplorerLink = false,
  explorerURL = EXPLORER_URL,
  children,
  className,
}) => {
  const router = useRouter();

  let link;
  if (path === "block") {
    link = `block?id=${block}`;
  } else if (path === "transaction") {
    link = `tx?id=${tx}`;
  } else if (path === "account") {
    if (isExplorerLink) {
      link = `address?id=${address}`;
    } else {
      link = `account?id=${accountId}`;
    }
  } else if (path === "pair") {
    link = `pair?id=${pair}`;
  } else if (path === "token") {
    link = `token?id=${token}`;
  } else if (path === "nft") {
    link = `nft?id=${nftId}`;
  }

  if (isExplorerLink) {
    link = makeExplorerURL(explorerURL, link);
  } else {
    link = `/${link}`;
  }

  const routerPathname = router.asPath.match(/(.+)\?.*/);

  if (
    routerPathname &&
    routerPathname.length > 0 &&
    routerPathname[1] === link
  ) {
    return (
      <div
        className={`items-center justify-center ${
          className || "inline-flex"
        } text-loopring-gray dark:text-white`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`items-center justify-center ${className || "inline-flex"}`}
    >
      <Link href={link}>
        <a
          className={`text-loopring-blue dark:text-loopring-dark-blue`}
          target={isExplorerLink ? "_blank" : "_self"}
        >
          {children}
        </a>
      </Link>
      {path === "account" && address && (
        <Link href={makeExplorerURL(explorerURL, `address/${address}`)}>
          <a className="ml-2 w-5 h-5" target="_blank">
            <img className="w-full h-full" src="/outgoing.svg" />
          </a>
        </Link>
      )}
    </div>
  );
};

export default AppLink;
