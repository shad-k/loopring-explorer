import React from "react";
import { useRouter } from "next/router";

import usePair from "../../hooks/usePair";
import getTokenAmount from "../../utils/getTokenAmount";
import Swaps from "../../components/pairDetail/Swaps";
import Trades from "../../components/pairDetail/Trades";

const Pair: React.FC<{}> = () => {
  const router = useRouter();
  const pairId = router.query.id;
  const [swapPage, setSwapPage] = React.useState<number>(1);
  const [orderbookPage, setOrderbookPage] = React.useState<number>(1);
  const { data, isLoading } = usePair(pairId, swapPage, 10, orderbookPage, 10);

  if (isLoading && !data) {
    return null;
  }

  const { token0, token1, token0Price, token1Price, swaps, trades } = (
    data as any
  ).pair; // need to do this because of TS complaining. Already have a null check above so this should be fine

  return (
    <div className="bg-white shadow-custom rounded p-4 m-2">
      <h1 className="text-3xl mb-5">
        {token0.symbol} / {token1.symbol}
      </h1>
      <div className="rounded-md border border-gray-200 inline px-2 py-1">
        1 {token0.symbol} = {getTokenAmount(token0Price, token1.decimals)}{" "}
        {token1.symbol}
      </div>
      <div className="rounded-md border border-gray-200 inline px-2 py-1 ml-2">
        1 {token1.symbol} = {getTokenAmount(token1Price, token0.decimals)}{" "}
        {token0.symbol}
      </div>

      <h3 className="text-2xl font-light mt-5">Swap Transactions</h3>
      <Swaps
        transactions={swaps}
        pageChangeHandler={(page) => setSwapPage(page)}
        page={swapPage}
      />
      <h3 className="text-2xl font-light mt-5">Order Book Transactions</h3>
      <Trades
        transactions={trades}
        pageChangeHandler={(page) => setOrderbookPage(page)}
        page={orderbookPage}
      />
    </div>
  );
};

export default Pair;
