import AppLink from "../AppLink";
import getTrimmedTxHash from "../../utils/getTrimmedTxHash";
import getTokenAmount from "../../utils/getTokenAmount";

const TransactionTableDetails: React.FC<{ type: string; tx: any }> = ({
  type,
  tx,
}) => {
  switch (type) {
    case "Add":
      return (
        <>
          <td>
            <AppLink
              path="account"
              address={tx.account.address}
              accountId={tx.account.id}
            >
              {getTrimmedTxHash(tx.account.address, 7)}
            </AppLink>
          </td>
          <td></td>
          <td>
            {getTokenAmount(tx.amount, tx.token.decimals).toFixed(4)}{" "}
            {tx.token.symbol}
          </td>
        </>
      );
    case "Remove":
      return (
        <>
          <td></td>
          <td>
            <AppLink
              path="account"
              address={tx.account.address}
              accountId={tx.account.id}
            >
              {getTrimmedTxHash(tx.account.address, 7)}
            </AppLink>
          </td>
          <td>
            {getTokenAmount(tx.amount, tx.token.decimals).toFixed(4)}{" "}
            {tx.token.symbol}
          </td>
        </>
      );
    case "Swap":
      return (
        <>
          <td>
            <AppLink
              path="account"
              address={tx.account.address}
              accountId={tx.account.id}
            >
              {getTrimmedTxHash(tx.account.address, 7)}
            </AppLink>
          </td>
          <td></td>
          <td></td>
        </>
      );
    case "OrderbookTrade":
      return (
        <>
          <td>
            <AppLink
              path="account"
              address={tx.accountA.address}
              accountId={tx.accountA.id}
            >
              {getTrimmedTxHash(tx.accountA.address, 7)}
            </AppLink>
          </td>
          <td>
            <AppLink
              path="account"
              address={tx.accountB.address}
              accountId={tx.accountB.id}
            >
              {getTrimmedTxHash(tx.accountB.address, 7)}
            </AppLink>
          </td>
          <td></td>
        </>
      );
    case "Deposit":
      return (
        <>
          <td></td>
          <td>
            <AppLink
              path="account"
              address={tx.toAccount.address}
              accountId={tx.toAccount.id}
            >
              {getTrimmedTxHash(tx.toAccount.address, 7)}
            </AppLink>
          </td>
          <td>
            {getTokenAmount(tx.amount, tx.token.decimals).toFixed(4)}{" "}
            {tx.token.symbol}
          </td>
        </>
      );
    case "Withdrawal":
      return (
        <>
          <td>
            <AppLink
              path="account"
              address={tx.fromAccount.address}
              accountId={tx.fromAccount.id}
            >
              {getTrimmedTxHash(tx.fromAccount.address, 7)}
            </AppLink>
          </td>
          <td></td>
          <td>
            {getTokenAmount(tx.amount, tx.token.decimals).toFixed(4)}{" "}
            {tx.token.symbol}
          </td>
        </>
      );
    case "Transfer":
      return (
        <>
          <td>
            <AppLink
              path="account"
              address={tx.fromAccount.address}
              accountId={tx.fromAccount.id}
            >
              {getTrimmedTxHash(tx.fromAccount.address, 7)}
            </AppLink>
          </td>
          <td>
            <AppLink
              path="account"
              address={tx.toAccount.address}
              accountId={tx.toAccount.id}
            >
              {getTrimmedTxHash(tx.toAccount.address, 7)}
            </AppLink>
          </td>
          <td>
            {getTokenAmount(tx.amount, tx.token.decimals).toFixed(4)}{" "}
            {tx.token.symbol}
          </td>
        </>
      );
    case "AccountUpdate":
      return (
        <>
          <td>
            <AppLink
              path="account"
              address={tx.user.address}
              accountId={tx.user.id}
            >
              {getTrimmedTxHash(tx.user.address, 7)}
            </AppLink>
          </td>
          <td></td>
          <td></td>
        </>
      );
    case "AmmUpdate":
      return (
        <>
          <td></td>
          <td></td>
          <td></td>
        </>
      );
    case "SignatureVerification":
      return (
        <>
          <td>
            <AppLink
              path="account"
              address={tx.account.address}
              accountId={tx.account.id}
            >
              {getTrimmedTxHash(tx.account.address, 7)}
            </AppLink>
          </td>
          <td></td>
          <td></td>
        </>
      );
  }
};

export default TransactionTableDetails;
