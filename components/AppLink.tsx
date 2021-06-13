import React from "react";
import Link from "next/link";

import { EXPLORER_URL } from "../utils/config";

interface Props {
  path: "block" | "transaction";
  block?: string;
  tx?: string;
  isExplorerLink?: boolean;
  explorerURL?: string;
}

const makeExplorerURL = (explorerURL: string, link: string): string => {
  return `${explorerURL}${explorerURL.substr(-1) === "/" ? "" : "/"}${link}`;
};

const AppLink: React.FC<Props> = ({
  path,
  block,
  tx,
  isExplorerLink = false,
  explorerURL = EXPLORER_URL,
}) => {
  let link;
  if (path === "block") {
    link = `block/${block}`;
  } else if (path === "transaction") {
    link = `tx/${tx}`;
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
        {block || tx}
      </a>
    </Link>
  );
};

export default AppLink;
