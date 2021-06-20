import React from "react";
import Link from "next/link";

import { EXPLORER_URL } from "../utils/config";

interface TxLink {
  path: "transaction";
  tx: string;
  block?: never;
  accountId?: never;
}

interface BlockLink {
  path: "block";
  block: string;
  tx?: never;
  accountId?: never;
}

interface AccountLink {
  path: "account";
  accountId: string;
  tx?: never;
  block?: never;
}

type Props = {
  isExplorerLink?: boolean;
  explorerURL?: string;
} & (TxLink | BlockLink | AccountLink);

const makeExplorerURL = (explorerURL: string, link: string): string => {
  return `${explorerURL}${explorerURL.substr(-1) === "/" ? "" : "/"}${link}`;
};

const AppLink: React.FC<React.PropsWithChildren<Props>> = ({
  path,
  block,
  tx,
  accountId,
  isExplorerLink = false,
  explorerURL = EXPLORER_URL,
  children,
}) => {
  let link;
  if (path === "block") {
    link = `block/${block}`;
  } else if (path === "transaction") {
    link = `tx/${tx}`;
  } else if (path === "account") {
    link = `account/${accountId}`;
  }

  if (isExplorerLink) {
    link = makeExplorerURL(explorerURL, link);
  } else {
    link = `/${link}`;
  }

  return (
    <Link href={link}>
      <a
        className={isExplorerLink ? "text-blue-700" : "text-indigo-800"}
        target={isExplorerLink ? "_blank" : "_self"}
      >
        {children}
      </a>
    </Link>
  );
};

export default AppLink;
