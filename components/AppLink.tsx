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

interface TxLink extends NotBlock, NotAccount, NotPair, NotToken {
  path: "transaction";
  tx: string;
}

interface BlockLink extends NotTx, NotAccount, NotToken, NotPair {
  path: "block";
  block: string;
}

interface AccountLink extends NotTx, NotBlock, NotToken, NotPair {
  path: "account";
  accountId: string;
  address?: string;
}

interface TokenLink extends NotTx, NotBlock, NotAccount, NotPair {
  path: "token";
  token: string;
}

interface PairLink extends NotTx, NotBlock, NotAccount, NotToken {
  path: "pair";
  pair: string;
}

type Props = {
  isExplorerLink?: boolean;
  explorerURL?: string;
  className?: string;
} & (TxLink | BlockLink | AccountLink | TokenLink | PairLink);

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
  isExplorerLink = false,
  explorerURL = EXPLORER_URL,
  children,
  className,
}) => {
  const router = useRouter();

  let link;
  if (path === "block") {
    link = `block/${block}`;
  } else if (path === "transaction") {
    link = `tx/${tx}`;
  } else if (path === "account") {
    link = `${isExplorerLink ? "address" : "account"}/${
      isExplorerLink ? address : accountId
    }`;
  } else if (path === "pair") {
    link = `pair/${pair}`;
  } else if (path === "token") {
    link = `token/${token}`;
  }

  if (isExplorerLink) {
    link = makeExplorerURL(explorerURL, link);
  } else {
    link = `/${link}`;
  }

  if (router.asPath === link) {
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
