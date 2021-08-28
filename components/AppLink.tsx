import React from "react";
import Link from "next/link";

import { EXPLORER_URL } from "../utils/config";

interface NotTx {
  tx?: never;
}

interface NotBlock {
  block?: never;
}

interface NotAccount {
  accountId?: never;
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
  pair,
  token,
  isExplorerLink = false,
  explorerURL = EXPLORER_URL,
  children,
  className,
}) => {
  let link;
  if (path === "block") {
    link = `block/${block}`;
  } else if (path === "transaction") {
    link = `tx/${tx}`;
  } else if (path === "account") {
    link = `${isExplorerLink ? "address" : "account"}/${accountId}`;
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

  return (
    <Link href={link}>
      <a
        className={`text-loopring-blue ${className || ""}`}
        target={isExplorerLink ? "_blank" : "_self"}
      >
        {children}
      </a>
    </Link>
  );
};

export default AppLink;
